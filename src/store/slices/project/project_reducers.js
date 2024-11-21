import { createSlice } from "@reduxjs/toolkit";

const status = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  error: "error",
};

const initialState = {
  proyectos: [],
  status: status.idle,
};

const proyectoSlice = createSlice({
  name: "proyectos",
  initialState,
  reducers: {
    dataProyectos(state, action) {
      state.proyectos = action.payload;
    },
    updateStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { dataProyectos, updateStatus } = proyectoSlice.actions;
export default proyectoSlice.reducer;
