import {configureStore} from '@reduxjs/toolkit';

import authSlice from './slices/auth';
import apiSlice from './slices/api';
import notifySlice from './slices/notify';
import userSlice from './slices/user';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        api: apiSlice,
        notify: notifySlice,
        user: userSlice
    }
});
