import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    loading: false,
    error: {},
};

const slice = createSlice({
    name: 'userActions',
    initialState,
    reducers: {
        init(state, action) {
            state.loading = true
        },
        set(state, action) {
            state.user = action.payload;
            state.loading = false
        },
        error(state, action) {
            state.loading = false
        },
    },
});

export default slice.reducer;
export const { reducer, actions } = slice;
export { initialState }