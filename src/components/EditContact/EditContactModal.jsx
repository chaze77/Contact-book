import { Box, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editContact, setError } from "../../store/slices/contactSlice";
import Modal from "@mui/material/Modal";
import { StyledButton, modalStyle } from "../../style/styled";
import Typography from "@mui/material/Typography";
import { errorMessage } from "../../errorMessage/errorMessage";

const EditContactModal = ({ contactId, open, close }) => {
  const [editedContact, setEditedContact] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const { contacts, errorEditName, errorEditEmail } = useSelector(
    (state) => state.contacts
  );
  const dispatch = useDispatch();

  const checkValidation = () => {
    if (!editedContact) {
      dispatch(
        setError({ type: "editName", message: errorMessage.nameRequired })
      );
    } else if (!editedEmail) {
      dispatch(
        setError({ type: "editEmail", message: errorMessage.emailRequired })
      );
    } else {
      handleUpdate();
    }
  };

  console.log(editedContact);
  const handleNameChange = (e) => {
    const name = e.target.value;
    setEditedContact(name);

    if (name === "" || editedContact === "") {
      dispatch(
        setError({ type: "editName", message: errorMessage.nameRequired })
      );
    } else {
      dispatch(setError({ type: "editName", message: "" }));
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEditedEmail(email);

    if (email === "" || editedEmail === "") {
      dispatch(
        setError({ type: "editEmail", message: errorMessage.emailRequired })
      );
    } else {
      dispatch(setError({ type: "editEmail", message: "" }));
    }
  };

  useEffect(() => {
    if (contactId) {
      const selectedContact = contacts.find(
        (contact) => contact.id === contactId
      );
      if (selectedContact) {
        setEditedContact(selectedContact.name);
        setEditedEmail(selectedContact.email);
      }
    }
  }, [contacts, contactId]);

  console.log("проверочный", contactId);

  const handleUpdate = () => {
    const updatedContact = {
      id: contactId,
      name: editedContact,
      email: editedEmail,
    };
    dispatch(editContact(updatedContact));
    close();
  };

  const handleClose = () => {
    dispatch(setError({ type: "editName", message: "" }));
    dispatch(setError({ type: "editEmail", message: "" }));
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
              Edit Contact
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
                value={editedContact}
                onChange={handleNameChange}
                InputLabelProps={{ shrink: true }}
              />
              {errorEditName && <p className="error-text">{errorEditName}</p>}

              <TextField
                label="Email"
                value={editedEmail}
                onChange={handleEmailChange}
                InputLabelProps={{ shrink: true }}
              />
              {errorEditEmail && <p className="error-text">{errorEditEmail}</p>}
            </Box>

            <StyledButton
              variant="contained"
              sx={{ backgroundColor: "#4a006a" }}
              onClick={checkValidation}
            >
              Update
            </StyledButton>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default EditContactModal;
