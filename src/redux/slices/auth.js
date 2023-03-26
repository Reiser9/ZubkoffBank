import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    authIsLoading: true,
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
            state.isAuth = action.payload.isAuth;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.typeToken = action.payload.typeToken;
        }
    }
});

export const {
    setIsAuth,
    setAuthIsLoading,
    setAccessToken,
    setRefreshToken,
    setTypeToken,
    setLogin
} = authSlice.actions;

export default authSlice.reducer;
