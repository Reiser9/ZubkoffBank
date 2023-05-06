import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    subscribes: []
};

export const subscribesSlice = createSlice({
    name: 'subscribes',
    initialState,
    reducers: {
        initSubscribes: (state, action) => {
            state.subscribes = action.payload;
        }
    }
});

export const {
    initSubscribes
} = subscribesSlice.actions;

export default subscribesSlice.reducer;
