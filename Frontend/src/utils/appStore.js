import {configureStore } from '@reduxjs/toolkit'
import { FeedReducer, UserReducer } from './appSlice';

const AppStore = configureStore(
    {
        reducer:
        {
            UserReducer:UserReducer,
            FeedReducer:FeedReducer
        }
    })

export default AppStore;