import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice(
    {
        name:"UserSlice",
        initialState:JSON.parse(localStorage.getItem('user')) || null,
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

const SearchSlice = createSlice(
    {
        name:"SearchSlice",
        initialState:[],
        reducers:
        {
            addSuggestion:(state,action)=>
                {
                    return Object.assign(state,action.payload)
                },
            removeSuggestion:(state,action)=>
                {
                    return null;
                }
        }
    })    


export const {addUser,removeUser} = UserSlice.actions
export const {addFeed,removeFeed} = FeedSlice.actions
export const {addSuggestion,removeSuggestion} = SearchSlice.actions

export const  UserReducer = UserSlice.reducer;
export const  FeedReducer = FeedSlice.reducer;
export const SearchReducer = SearchSlice.reducer;