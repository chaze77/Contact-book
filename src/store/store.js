import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./slices/contactSlice";
export const store = configureStore({
  reducer: { contacts: contactsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
