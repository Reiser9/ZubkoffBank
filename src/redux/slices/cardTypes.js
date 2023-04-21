import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cardTypes: {}
};

export const cardTypesSlice = createSlice({
    name: 'cardTypes',
    initialState,
    reducers: {
        initCardTypes: (state, action) => {
            state.cardTypes = action.payload
        },
        addCardTypes: (state, action) => {
            state.cardTypes.content = state.cardTypes.content.concat(action.payload);
            state.cardTypes.totalElements += 1;
        }
    }
});

export const {
    initCardTypes,
    addCardTypes
} = cardTypesSlice.actions;

export default cardTypesSlice.reducer;
