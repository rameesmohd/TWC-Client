import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { UserAuth } from './ClientSlice';
import { AdminAuth } from './AdminSclice';
import { CourseSlice } from './CourseSlice'

const persistConfig = { key: 'Client', storage, version: 1};
const persistedReducer = persistReducer(persistConfig, UserAuth.reducer);

const adminpersistConfig = {key : 'Admin',storage ,version : 1}
const adminPersistorReducer = persistReducer(adminpersistConfig,AdminAuth.reducer)

export const store = configureStore({
  reducer: {
    Client: persistedReducer,
    Admin : adminPersistorReducer,
    Course : CourseSlice.reducer
  },
});

export const persistor = persistStore(store);

