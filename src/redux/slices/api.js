import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currency: {},
    weather: {}
};

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setCurrencyData: (state, action) => {
            state.currency = {...action.payload};
        },
        setWeatherData: (state, action) => {
            state.weather = {...action.payload};
        }
    }
});

export const {
    setCurrencyData,
    setWeatherData
} = apiSlice.actions;

export default apiSlice.reducer;
