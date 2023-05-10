import {configureStore} from '@reduxjs/toolkit';

import authSlice from './slices/auth';
import apiSlice from './slices/api';
import notifySlice from './slices/notify';
import userSlice from './slices/user';
import cardTypesSlice from './slices/cardTypes';
import serverSlice from './slices/server';
import adminSlice from './slices/admin';
import appSlice from './slices/app';
import subscribesSlice from './slices/subscribes';
import transfersSlice from './slices/transfers';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        api: apiSlice,
        notify: notifySlice,
        user: userSlice,
        cardTypes: cardTypesSlice,
        server: serverSlice,
        admin: adminSlice,
        app: appSlice,
        subscribes: subscribesSlice,
        transfers: transfersSlice
    }
});
