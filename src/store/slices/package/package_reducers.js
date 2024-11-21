import { createSlice } from "@reduxjs/toolkit";

const status = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  error: "error",
};

const initialState = {
  paquetes: [],
  status: status.idle,
};

const packageSlice = createSlice({
  name: "paquetes",
  initialState,
  reducers: {
    dataPaquetes(state, action) {
      state.paquetes = action.payload;
    },
    updateStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { dataPaquetes, updateStatus } = packageSlice.actions;
export default packageSlice.reducer;
