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
  users: loadFromStorage("users", []),
  user: loadFromStorage("currentUser", null),
  error: null,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,

  reducers: {
    register: (state, action) => {
      const { name, email, password } = action.payload;

      const exists = state.users.find((record) => record.email === email);

      if (exists) {
        state.error = "This email is already registered";
      }

      state.users.push({ id: Date.now(), name, email, password });
      state.error = null;
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    login: (state, action) => {
      const { email, password } = action.payload;

      const found = state.users.find(
        (record) => record.email === email && record.password === password,
      );

      if (!found) {
        state.error = "Invalid Email or Password";
        return;
      }

      state.user = found;
      state.error = null;
      localStorage.setItem("currentUser", JSON.stringify(found));
    },

    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("currentUser");
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
