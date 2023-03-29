import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    users: {}
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        initUsers: (state, action) => {
            state.users = action.payload;
        }
    }
});

export const {
    initUsers
} = adminSlice.actions;

export default adminSlice.reducer;
