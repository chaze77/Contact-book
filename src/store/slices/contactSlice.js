import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: JSON.parse(localStorage.getItem("contacts")) || [],
  inputValue: "",
  errorName: "",
  errorEmail: "",
  errorEditName: "",
  errorEditEmail: "",
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },

    addContact: (state, action) => {
      const newContact = action.payload;

      state.contacts.push(newContact);
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },

    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );

      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
    editContact: (state, action) => {
      const { id, name, email } = action.payload;
      const updatedContacts = state.contacts.map((contact) => {
        if (contact.id === id) {
          return { ...contact, name, email };
        }
        return contact;
      });
      state.contacts = updatedContacts;
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    },
    setError: (state, action) => {
      const { type, message } = action.payload;
      switch (type) {
        case "name":
          state.errorName = message;
          break;
        case "email":
          state.errorEmail = message;
          break;
        case "editName":
          state.errorEditName = message;
          break;
        case "editEmail":
          state.errorEditEmail = message;
          break;
        default:
          break;
      }
    },
  },
});

export const {
  setContacts,
  setInputValue,
  deleteContact,
  editContact,
  setError,
  addContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;
