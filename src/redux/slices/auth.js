import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    accessToken: "",
    refreshToken: "",
    typeToken: ""
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        }
    }
});

export const {
    setIsAuth
} = authSlice.actions;

export default authSlice.reducer;
