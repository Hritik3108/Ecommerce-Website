import {configureStore,applyMiddleware} from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import productsReducer from './productsSlice';
import userReducer from './userSlice';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import clearCartOnLogout from './middleware';
import * as thunkMiddleware  from 'redux-thunk';

const rootReducer = combineReducers({ 
    cart: cartReducer,
    products: productsReducer,
    user:userReducer,
})

const persistConfig = {
    key: 'root',
    storage: storageSession,
    // storage,
    // whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware( {serializableCheck: false}).concat(clearCartOnLogout),
},
applyMiddleware(thunkMiddleware)
)

export const persistor = persistStore(store)