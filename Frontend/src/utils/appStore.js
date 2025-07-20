import {configureStore } from '@reduxjs/toolkit'
import { FeedReducer, SearchReducer, UserReducer } from './appSlice';

const AppStore = configureStore(
    {
        reducer:
        {
            UserReducer:UserReducer,
            FeedReducer:FeedReducer,
            SearchReducer:SearchReducer
        }
    })

export default AppStore;