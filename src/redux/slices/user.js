import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userIsLoading: false,
    user: {},
    cards: [],
    subscribes: []
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
        initCards: (state, action) => {
            state.cards = action.payload
        },
        addCards: (state, action) => {
            state.cards = state.cards.concat(action.payload)
        },
        updateCard: (state, action) => {
            const cardsData = state.cards;

            const indexToUpdate = cardsData.findIndex(item => item.id === action.payload.id);
            
            if(indexToUpdate !== -1){
                cardsData.splice(indexToUpdate, 1, action.payload.data);
            }
        },
        initSubscribes: (state, action) => {
            state.subscribes = action.payload
        },
        removeCard: (state, action) => {
            const indexToRemove = state.cards.findIndex(item => item.id === action.payload);

            if(indexToRemove !== -1) {
                state.cards = state.cards.filter((_, index) => index !== indexToRemove);
            }
        },
        reissueCard: (state, action) => {
            const indexToSwap = state.cards.findIndex(item => item.id === action.payload.id);

            if(indexToSwap !== -1) {
                state.cards.splice(indexToSwap, 1, action.payload.data);
            }
        },
        initTransfersHistory: (state, action) => {
            const indexTransfer = state.cards.findIndex(item => item.id === action.payload.id);
            const elementTransfer = state.cards[indexTransfer];

            if(indexTransfer !== -1) {
                state.cards.splice(indexTransfer, 1, {
                    ...elementTransfer,
                    transfers: action.payload.data
                });
            }
        },
        concatTransfersHistory: (state, action) => {
            const indexTransfer = state.cards.findIndex(item => item.id === action.payload.id);

            if(indexTransfer !== -1) {
                state.cards[indexTransfer].transfers.content = [...state.cards[indexTransfer].transfers.content, ...action.payload.data.content];
            }
        },
        setDataUser: () => initialState
    }
});

export const {
    setUserIsLoading,
    updateUser,
    initCards,
    addCards,
    updateCard,
    setDataUser,
    initSubscribes,
    removeCard,
    reissueCard,
    initTransfersHistory,
    concatTransfersHistory
} = userSlice.actions;

export default userSlice.reducer;
