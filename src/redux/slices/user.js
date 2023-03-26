import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userIsLoading: false,
    user: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserIsLoading: (state, action) => {
            state.userIsLoading = action.payload
        },
        setUser: (state, action) => {
            state.user = {...state.user, ...action.payload}
        }
    }
});

export const {
    setUserIsLoading,
    setUser
} = userSlice.actions;

export default userSlice.reducer;
