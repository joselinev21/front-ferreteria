import { createSlice } from "@reduxjs/toolkit";

const status = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  error: "error",
};

const initialState = {
  url: [],
  status: status.idle,
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    updateUrlPhoto(state, action) {
      state.url = action.payload;
    },
    updateStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { updateStatus, updateUrlPhoto } = photoSlice.actions;
export default photoSlice.reducer;
