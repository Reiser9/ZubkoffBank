import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userLoading: false,
    user: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLoading: (state, action) => {
            state.userLoading = action.payload
        },
        setUser: (state, action) => {
            state.user = {...state.user, ...action.payload}
        }
    }
});

export const {
    setUserLoading,
    setUser
} = userSlice.actions;

export default userSlice.reducer;
