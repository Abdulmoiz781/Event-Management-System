import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  items: loadFromStorage("registrations", []),
};

const registrationsSlice = createSlice({
  name: "registrations",
  initialState,
  reducers: {
    registerForEvent: (state, action) => {
      const { userId, eventId } = action.payload;

      const exists = state.items.some(
        (r) => r.userId === userId && r.eventId === eventId,
      );
      if (exists) return;

      state.items.push(action.payload);
      localStorage.setItem("registrations", JSON.stringify(state.items));
    },

    cancelRegistration: (state, action) => {
      const { userId, eventId } = action.payload;

      state.items = state.items.filter(
        (r) => !(r.userId === userId && r.eventId === eventId),
      );
      localStorage.setItem("registrations", JSON.stringify(state.items));
    },
  },
});

export const { registerForEvent, cancelRegistration } =
  registrationsSlice.actions;
export default registrationsSlice.reducer;
