import { createSlice } from "@reduxjs/toolkit";

const status = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  error: "error",
};

const initialState = {
  usuarios: [],
  status: status.idle,
};

const usuariosSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    dataUsuarios(state, action) {
      state.usuarios = action.payload;
    },
    updateStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { dataUsuarios, updateStatus } = usuariosSlice.actions;
export default usuariosSlice.reducer;
