import {combineReducers, configureStore} from '@reduxjs/toolkit'

import {persistReducer, persistStore, type Persistor,} from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import inventoryReducer from "../features/inventory/slices"
import  authReducer from '~/features/auth/authSlice'
// Storage compatible con SSR (no hace nada)
export const noopStorage = {
  getItem() {
    return Promise.resolve(null);
  },
  setItem() {
    return Promise.resolve();
  },
  removeItem() {
    return Promise.resolve();
  },
};


const rootReducer = combineReducers({
    inventory:inventoryReducer,
    auth:authReducer
})
const isBrowser = typeof window !== "undefined";

const persistedReducer = persistReducer({
    key:'root',
    storage: isBrowser ? storage : noopStorage,
    whitelist:['auth']
}
,rootReducer)



export const store = configureStore({
    reducer:persistedReducer
})
export const persistor  = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

