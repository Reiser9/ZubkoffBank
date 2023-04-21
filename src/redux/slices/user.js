import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userIsLoading: false,
    user: {},
    cards: []
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
        // updateCard: (state, action) => {
        //     const cardsData = state.cards;

        //     const indexToUpdate = cardsData.findIndex(item => item.id === action.payload.id);
            
        //     if(indexToUpdate !== -1){
        //         cardsData.splice(indexToUpdate, 1, action.payload.data);
        //     }
        // },
        setDataUser: () => initialState
    }
});

export const {
    setUserIsLoading,
    updateUser,
    initCards,
    addCards,
    // updateCard,
    setDataUser
} = userSlice.actions;

export default userSlice.reducer;
