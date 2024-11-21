import { createSlice } from "@reduxjs/toolkit";

const status = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  error: "error",
};

const initialState = {
  ofertas: [],
  status: status.idle,
};

const ofertasSlice = createSlice({
  name: "ofertas",
  initialState,
  reducers: {
    dataOfertas(state, action) {
      state.ofertas = action.payload;
    },
    updateStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { dataOfertas, updateStatus } = ofertasSlice.actions;
export default ofertasSlice.reducer;
