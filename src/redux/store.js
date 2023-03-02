import {configureStore} from '@reduxjs/toolkit';

import authSlice from './slices/auth';
import apiSlice from './slices/api';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        api: apiSlice
    }
});
