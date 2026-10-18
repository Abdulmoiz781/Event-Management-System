import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEvents } from "../services/ticketmaster";

export const loadEvents = createAsyncThunk(
  // actions are coming from thunk
  "events/loadEvents",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchEvents(params);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  list: [],
  totalPages: 0,
  loading: false,
  error: null,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload._embedded?.events || [];
        state.totalPages = action.payload.page?.totalPages || 0;
      })
      .addCase(loadEvents.rejected, (state, action) => {
        state.loading = false;
        state.list = [];
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default eventsSlice.reducer;
