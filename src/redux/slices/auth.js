import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    authIsLoading: false,
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
        },
        setAuthIsLoading: (state, action) => {
            state.authIsLoading = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        setTypeToken: (state, action) => {
            state.typeToken = action.payload;
        },
        setLogin: (state, action) => {
            const {isAuth, accessToken, refreshToken, typeToken} = action.payload;

            state.isAuth = isAuth;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.typeToken = typeToken;
        },
        setDataAuth: () => initialState
    }
});

export const {
    setIsAuth,
    setAuthIsLoading,
    setAccessToken,
    setRefreshToken,
    setTypeToken,
    setLogin,
    setDataAuth
} = authSlice.actions;

export default authSlice.reducer;
