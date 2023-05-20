import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    infoBanks: [],
    infoTransfer: [],
    comission: 0
};

export const transfersSlice = createSlice({
    name: 'transfers',
    initialState,
    reducers: {
        initInfoBanks: (state, action) => {
            state.infoBanks = action.payload;
        },
        initInfoTransfer: (state, action) => {
            state.infoTransfer = action.payload;
        },
        addInfoTransfer: (state, action) => {
            state.infoTransfer = [...state.infoTransfer, action.payload];
        },
        setComission: (state, action) => {
            state.comission = action.payload;
        }
    }
});

export const {
    initInfoBanks,
    initInfoTransfer,
    addInfoTransfer,
    setComission
} = transfersSlice.actions;

export default transfersSlice.reducer;
