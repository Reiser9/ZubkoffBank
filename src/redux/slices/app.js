import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    appIsLoading: false
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppIsLoading: (state, action) => {
            state.appIsLoading = action.payload
        }
    }
});

export const {
    setAppIsLoading
} = appSlice.actions;

export default appSlice.reducer;
