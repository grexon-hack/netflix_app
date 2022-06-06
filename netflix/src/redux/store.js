import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware
})


export default store;