import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    users: {},
    usersPagin: {},
    cardTypes: {},
    cardTypesPagin: {}
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        initUsers: (state, action) => {
            const {content, totalPages, number, size, totalElements} = action.payload;

            const contentArray = Array.from({length: totalElements}, () => null);
            contentArray.splice(0, content.length, ...content);
            
            state.users = {
                content: contentArray
            };

            state.usersPagin = {
                content: contentArray.slice(0, 10),
                page: number,
                size,
                totalPages,
                totalElements
            };
        },
        addUsersPaggination: (state, action) => {
            const {page, limit, data} = action.payload;
            const {totalPages, totalElements} = data;

            state.users.content.splice(page * limit, data.content.length, ...data.content);
            state.usersPagin = {
                ...state.usersPagin,
                content: [...data.content],
                page,
                size: limit,
                totalPages,
                totalElements
            }
        },
        getUsersPaggination: (state, action) => {
            const {page, limit} = action.payload;
            const currentElements = state.users.content.slice(page * limit, (page + 1) * limit);

            const currentTotalPages = Math.ceil(state.usersPagin.totalElements / limit);

            state.usersPagin = {
                ...state.usersPagin,
                content: currentElements,
                page,
                size: limit,
                totalPages: currentTotalPages
            }
        },
        initCardTypes: (state, action) => {
            const {content, totalPages, number, size, totalElements} = action.payload
            
            const contentArray = Array.from({length: totalElements}, () => null);
            contentArray.splice(0, content.length, ...content);
            
            state.cardTypes = {
                content: contentArray
            };

            state.cardTypesPagin = {
                content: contentArray.slice(0, 10),
                totalPages,
                page: number,
                size,
                totalElements
            }
        },
        addCardTypesPaggination: (state, action) => {
            const {page, limit, data} = action.payload;

            state.cardTypes.content.splice(page * limit, data.content.length, ...data.content);
            state.cardTypesPagin = {
                ...state.cardTypesPagin,
                content: [...data.content],
                page,
                size: limit
            }
        },
        getCardTypesPaggination: (state, action) => {
            const {page, limit} = action.payload;
            const currentElements = state.cardTypes.content.slice(page * limit, (page + 1) * limit);

            state.cardTypesPagin = {
                ...state.cardTypesPagin,
                content: currentElements,
                page,
                size: limit
            }
        },
        updateCard: (state, action) => {
            const indexUser = state.users.content.findIndex(item => item.id === action.payload.userId);
            const userCards = state.users.content[indexUser].cards;
            const indexUserPagin = state.usersPagin.content.findIndex(item => item.id === action.payload.userId);
            const userCardsPagin = state.usersPagin.content[indexUserPagin].cards;

            const indexToUpdate = userCards.findIndex(item => item.id === action.payload.id);
            const indexToUpdatePagin = userCardsPagin.findIndex(item => item.id === action.payload.id);
            
            if(indexToUpdate !== -1 && indexToUpdatePagin !== -1) {
                userCards.splice(indexToUpdate, 1, action.payload.data);
                userCardsPagin.splice(indexToUpdatePagin, 1, action.payload.data);
            }
        },
        updateUser: (state, action) => {
            const userData = state.users.content;
            const userDataPagin = state.usersPagin.content;

            const indexToUpdate = userData.findIndex(item => item.id === action.payload.id);
            const indexToUpdatePagin = userDataPagin.findIndex(item => item.id === action.payload.id);
            
            if(indexToUpdate !== -1 && indexToUpdatePagin !== -1) {
                userData.splice(indexToUpdate, 1, action.payload.data);
                userDataPagin.splice(indexToUpdatePagin, 1, action.payload.data);
            }
        },
        addCardTypes: (state, action) => {
            state.cardTypes.content = state.cardTypes.content.concat(action.payload);
            state.cardTypesPagin.totalElements += 1;
        },
        setDataAdmin: () => initialState
    }
});

export const {
    initUsers,
    addUsersPaggination,
    getUsersPaggination,
    initCardTypes,
    addCardTypesPaggination,
    getCardTypesPaggination,
    updateCard,
    updateUser,
    addCardTypes,
    setDataAdmin
} = adminSlice.actions;

export default adminSlice.reducer;
