import {configureStore} from '@reduxjs/toolkit';

import authSlice from './slices/auth';
import apiSlice from './slices/api';
import notifySlice from './slices/notify';
import userSlice from './slices/user';
import cardTypesSlice from './slices/cardTypes';
import serverSlice from './slices/server';
import adminSlice from './slices/admin';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        api: apiSlice,
        notify: notifySlice,
        user: userSlice,
        cardTypes: cardTypesSlice,
        server: serverSlice,
        admin: adminSlice
    }
});
