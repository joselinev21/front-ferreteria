import { createSlice } from "@reduxjs/toolkit";

const status = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  error: "error",
};

const initialState = {
  proveedores: [],
  status: status.idle,
};

const proveedorSlice = createSlice({
  name: "proveedores",
  initialState,
  reducers: {
    dataProveedores(state, action) {
      state.proveedores = action.payload;
    },
    updateStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { dataProveedores, updateStatus } = proveedorSlice.actions;
export default proveedorSlice.reducer;
