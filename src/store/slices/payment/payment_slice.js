import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productos: [],
  total: 0,
  estado: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment(state, action) {
      state.productos = action.payload.productos;
      state.total = action.payload.total;
    },
    updateState(state, action) {
      state.estado = action.payload;
    },
  },
});

export const { setPayment, updateState } = paymentSlice.actions;
export default paymentSlice.reducer;
