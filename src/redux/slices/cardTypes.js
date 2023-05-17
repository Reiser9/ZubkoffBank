import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cardTypes: {
        content: []
    }
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
        },
        concatCardTypes: (state, action) => {
            state.cardTypes.content = state.cardTypes.content.concat(action.payload.content);
        },
    }
});

export const {
    initCardTypes,
    addCardTypes,
    concatCardTypes
} = cardTypesSlice.actions;

export default cardTypesSlice.reducer;
