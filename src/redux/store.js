import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import eventsReducer from "./eventsSlice";
import registrationsReducer from "./registrationsSlice";

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
});
