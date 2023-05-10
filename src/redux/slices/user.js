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
        addSubscribe: (state, action) => {
            const actionId = action.payload[0].subscribe.id;
            const currentElement = state.subscribes.findIndex(element => element.subscribe.id === actionId);
            
            if(currentElement === -1){
                return state.subscribes = [...state.subscribes, ...action.payload];
            }

            state.subscribes.map(data => {
                if(data.subscribe.id === currentElement.id){
                    return {...action.payload};
                }
            })
            //state.subscribes.splice(currentElement, 1, ...action.payload);
        },
        removeSubscribe: (state, action) => {
            const actionId = action.payload[0].subscribe.id;
            const currentElement = state.subscribes.findIndex(element => element.subscribe.id === actionId);
            
            if(currentElement === -1){
                return;
            }

            state.subscribes.splice(currentElement, 1, ...action.payload);
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
    addSubscribe,
    removeSubscribe
} = userSlice.actions;

export default userSlice.reducer;
