import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isServerAvailable: true
};

export const serverSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {
        setIsServerAvailable: (state, action) => {
            state.isServerAvailable = action.payload;
        }
    }
});

export const {
    setIsServerAvailable
} = serverSlice.actions;

export default serverSlice.reducer;
