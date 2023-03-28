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
        updateUser: (state, action) => {
            state.user = {...state.user, ...action.payload}
        },
        initUser: (state, action) => {
            state.user = action.payload
        },
    }
});

export const {
    setUserIsLoading,
    initUser,
    updateUser
} = userSlice.actions;

export default userSlice.reducer;
