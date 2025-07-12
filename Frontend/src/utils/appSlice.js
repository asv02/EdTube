import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice(
    {
        name:"UserSlice",
        initialState:[],
        reducers:
        {
            addUser:(state,action)=>
                {
                     return action.payload;
                },
            removeUser:(state,action)=>
                {
                      return null;
                }
        }
    })

const FeedSlice = createSlice(
    {
        name:"FeedSlice",
        initialState:[],
        reducers:
        {
            addFeed:(state,action)=>
                {
                     return action.payload;
                },
            removeFeed:(state,action)=>
                {
                      return null;
                }
        }
    })


export const {addUser,removeUser} = UserSlice.actions
export const {addFeed,removeFeed} = FeedSlice.actions
export const  UserReducer = UserSlice.reducer
export const  FeedReducer = FeedSlice.reducer