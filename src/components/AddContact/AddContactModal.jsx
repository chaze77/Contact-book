import { Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, setError } from "../../store/slices/contactSlice";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { StyledButton, modalStyle } from "../../style/styled";
import { errorMessage } from "../../errorMessage/errorMessage";

const AddContactModal = ({ open, close }) => {
  const dispatch = useDispatch();
  const { errorName, errorEmail } = useSelector((state) => state.contacts);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const checkValidation = () => {
    if (!contactName) {
      dispatch(setError({ type: "name", message: errorMessage.nameRequired }));
    } else if (!contactEmail) {
      dispatch(
        setError({ type: "email", message: errorMessage.emailRequired })
      );
    } else {
      addNewContact();
    }
  };

  const handleClose = () => {
    dispatch(setError({ type: "email", message: "" }));
    dispatch(setError({ type: "name", message: "" }));
    close();
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setContactName(name);

    if (name === "") {
      dispatch(setError({ type: "name", message: errorMessage.nameRequired }));
    } else {
      dispatch(setError({ type: "name", message: "" }));
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setContactEmail(email);

    if (email === "") {
      setError({ type: "email", message: errorMessage.emailRequired });
    } else {
      dispatch(setError({ type: "email", message: "" }));
    }
  };

  const addNewContact = () => {
    const newContact = {
      id: uuidv4(),
      name: contactName,
      email: contactEmail,
    };
    dispatch(addContact(newContact));
    setContactName("");
    setContactEmail("");
    close();
  };

  return (
    <Box>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography variant="h4" sx={{ mb: "40px" }}>
              Add Contact
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                mb: "40px",
              }}
            >
              <TextField
                label="Name"
                value={contactName}
                onChange={handleNameChange}
                InputLabelProps={{ shrink: true }}
              />
              {errorName && <p className="error-text">{errorName}</p>}

              <TextField
                label="Email"
                value={contactEmail}
                onChange={handleEmailChange}
                InputLabelProps={{ shrink: true }}
              />
              {errorEmail && <p className="error-text">{errorEmail}</p>}
            </Box>

            <StyledButton
              variant="contained"
              sx={{ backgroundColor: "black" }}
              onClick={checkValidation}
            >
              Add
            </StyledButton>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default AddContactModal;
