import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setContacts,
  setInputValue,
  deleteContact,
} from "../../store/slices/contactSlice";
import {
  Container,
  Typography,
  Box,
  InputLabel,
  Input,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { StyledButton } from "../../style/styled";
import EditContact from "../EditContact/EditContactModal";
import AddContactModal from "../AddContact/AddContactModal";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts, inputValue } = useSelector((state) => state.contacts);
  const [selectedId, setSelectedId] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const API = "https://jsonplaceholder.typicode.com";

  const getContacts = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API}/users`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        dispatch(setContacts(data));
        localStorage.setItem("contacts", JSON.stringify(data));
      } else {
        console.log("Error:", xhr.status);
      }
    };
    xhr.onerror = () => {
      console.log("Request failed");
    };
    xhr.send();
  };

  useEffect(() => {
    if (
      localStorage.getItem("contacts") === null ||
      localStorage.getItem("contacts") === "[]"
    ) {
      getContacts();
    }
  }, []);

  const handleEdit = (id) => {
    setShowEditModal(true);
    setSelectedId(id);
  };

  //получаем первую букву имени
  const firstLetters = contacts
    .map((contact) => contact.name.toLowerCase().charAt(0))
    .sort();

  //создаем массив только из уникальных букв
  const uniqueLetters = [...new Set(firstLetters)];

  const groupedContacts = [];

  //делаем проверку буквы в массиве uniqueLetters с массивом contacts и заполняем новый массив groupedContacts
  uniqueLetters.forEach((letter) => {
    const contactsWithSameLetter = contacts.filter(
      (contact) => contact.name.toLowerCase().charAt(0) === letter
    );
    groupedContacts.push(contactsWithSameLetter);
  });

  //фильтруем контакты для поиска
  const filteredContacts = [];
  groupedContacts.forEach((contactsArray, index) => {
    const letter = uniqueLetters[index];
    const filteredArray = contactsArray.filter((contact) => {
      if (inputValue === "") {
        return contact;
      } else {
        const lowerCaseName = contact.name.toLowerCase();
        const lowerCaseValue = inputValue.toLowerCase();
        return lowerCaseName.includes(lowerCaseValue);
      }
    });
    if (filteredArray.length > 0) {
      filteredContacts.push({
        letter: letter,
        contacts: filteredArray,
      });
    }
  });

  const handleOpenModal = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleCloseModalEdit = () => {
    setShowEditModal(false);
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: { md: "60%", sm: "60%", xs: "80%" } }}>
        <Typography
          variant="h4"
          sx={{
            mb: "20px",
            fontSize: { md: "30px", sm: "24px", xs: "24px" },
          }}
        >
          {" "}
          Contacts Manager
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { md: "row", sm: "column", xs: "column" },
            alignItems: "center",
            mb: "20px",
          }}
        >
          <FormControl
            sx={{
              mb: { md: "5px", sm: "10px", xs: "10px" },
              width: { md: 180, sm: 180, xs: 200 },
            }}
          >
            <InputLabel>Search Contact</InputLabel>
            <Input
              sx={{ pl: "10px" }}
              variant="filled"
              onChange={(e) => dispatch(setInputValue(e.target.value))}
              id="input-with-icon-adornment"
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>

          <StyledButton
            variant="contained"
            onClick={handleOpenModal}
            sx={{ width: { md: 120, sm: 180, xs: 180 } }}
          >
            Add Contact
          </StyledButton>
        </Box>
        {filteredContacts.map((group) => (
          <Box key={group.letter}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "500",
                color: "red",
                display: "flex",
                alignSelf: "flex-start",
                width: "20%",
              }}
            >
              {group.letter}
            </Typography>
            {group.contacts.map((contact) => (
              <Box
                key={contact.id}
                sx={{
                  display: "flex",
                  alignItems: " center",
                  width: "100%",
                  justifyContent: "space-between",
                  borderTop: "1px solid grey",
                  mb: "5px",
                  pt: "5px",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      textAlign: "left",
                      fontSize: { md: "18px", sm: "16px", xs: "14px" },
                    }}
                  >
                    {contact.name}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "left",
                      color: "blue",
                      fontSize: { md: "16px", sm: "14px", xs: "14px" },
                    }}
                  >
                    {contact.email}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { md: "row", sm: "column", xs: "column" },
                  }}
                >
                  <EditNoteIcon
                    onClick={() => handleEdit(contact.id)}
                    sx={{ fill: "blue", fontSize: "24px", cursor: "pointer" }}
                  />
                  <DeleteForeverIcon
                    sx={{ fill: "red", cursor: "pointer", fontSize: "24px" }}
                    onClick={() => dispatch(deleteContact(contact.id))}
                  />
                </Box>
                {showEditModal && selectedId === contact.id && (
                  <EditContact
                    contactId={selectedId}
                    open={showEditModal}
                    close={handleCloseModalEdit}
                  />
                )}
              </Box>
            ))}
          </Box>
        ))}
        {showAddModal ? (
          <AddContactModal open={showAddModal} close={handleCloseModal} />
        ) : null}
      </Box>
    </Container>
  );
};

export default ContactList;
