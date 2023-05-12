import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patient: {},
  patients: [],
  error: {},
  loading: false,
};
const slice = createSlice({
  name: "patientActions",
  initialState,
  reducers: {
    init(state, action) {
      state.loading = true;
    },
    set(state, action) {
      state.patient = action.payload;
      state.loading = false;
    },
    setAll(state, action) {
      state.patients = action.payload
      state.loading = false;
    },
    setFilter(state, action) {
      state.patients = state.patients.filter(i => i._id !== action?.payload)
    },
    error(state, action) {
      state.loading = false;
    },
  },
});

export default slice.reducer;
export const { reducer, actions } = slice;
export { initialState };
