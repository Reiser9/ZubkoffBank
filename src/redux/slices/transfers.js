import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    
};

export const transfersSlice = createSlice({
    name: 'transfers',
    initialState,
    reducers: {
        
    }
});

export const {
    initSubscribes
} = transfersSlice.actions;

export default transfersSlice.reducer;
