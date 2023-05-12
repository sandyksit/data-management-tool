import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    level: 'error',
    message: '',
    isOpen: false,
};

const slice = createSlice({
    name: 'alertActions',
    initialState,
    reducers: {
        init(state, action) {
            state.isOpen = false
        },
        set(state, action) {
            state.level = action.payload.level;
            state.message = action.payload.message;
            state.isOpen = true;
        },
        remove(state, action) {
            state.isOpen = false;
        }
    },
});

export default slice.reducer;
export const { reducer, actions } = slice;
export { initialState }