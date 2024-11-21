import { createSlice } from "@reduxjs/toolkit";

const status = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  error: "error",
};

const initialState = {
  productos: [],
  status: status.idle,
};

const productSlice = createSlice({
  name: "productos",
  initialState,
  reducers: {
    dataProduct(state, action) {
      state.productos = action.payload;
    },
    actualizarStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { actualizarStatus, dataProduct } = productSlice.actions;
export default productSlice.reducer;
