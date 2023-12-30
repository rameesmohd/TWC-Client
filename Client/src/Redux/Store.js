import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {UserAuth} from './ClientSlice';

const persistConfig = {
  key: 'Client',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, UserAuth.reducer);

export const store = configureStore({
  reducer: {
    Client: persistedReducer,
  },
});

export const persistor = persistStore(store);
