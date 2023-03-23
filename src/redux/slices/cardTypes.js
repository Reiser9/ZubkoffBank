import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cardTypes: {}
};

export const cardTypesSlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        initCardTypes: (state, action) => {
            state.cardTypes = action.payload
        }
    }
});

export const {
    initCardTypes
} = cardTypesSlice.actions;

export default cardTypesSlice.reducer;
