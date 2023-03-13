import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    notify: []
};

export const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        addNotify: (state, action) => {
            state.notify = action.payload;
        },
        removeNotify: (state, action) => {
            state.notify = action.payload;
        }
    }
});

export const {
    setNotify
} = notifySlice.actions;

export default notifySlice.reducer;
