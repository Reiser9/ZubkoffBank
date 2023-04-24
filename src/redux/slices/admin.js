import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    users: {},
    cardTypes: {}
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        initUsers: (state, action) => {
            state.users = action.payload;
        },
        initCardTypes: (state, action) => {
            const {content, totalPages, number, size, totalElements} = action.payload

            state.cardTypes = {
                content,
                totalPages,
                page: number,
                size,
                totalElements
            };
        },
        updateCard: (state, action) => {
            const indexUser = state.users.content.findIndex(item => item.id === action.payload.userId);
            const userCards = state.users.content[indexUser].cards;

            const indexToUpdate = userCards.findIndex(item => item.id === action.payload.id);
            
            if(indexToUpdate !== -1) {
                userCards.splice(indexToUpdate, 1, action.payload.data);
            }
        },
        updateUser: (state, action) => {
            const userData = state.users.content;

            const indexToUpdate = userData.findIndex(item => item.id === action.payload.id);
            
            if(indexToUpdate !== -1) {
                userData.splice(indexToUpdate, 1, action.payload.data);
            }
        },
        addCardTypes: (state, action) => {
            state.cardTypes.content = state.cardTypes.content.concat(action.payload);
            state.cardTypes.totalElements += 1;
        },
        setDataAdmin: () => initialState
    }
});

export const {
    initUsers,
    initCardTypes,
    updateCard,
    updateUser,
    addCardTypes,
    setDataAdmin
} = adminSlice.actions;

export default adminSlice.reducer;
