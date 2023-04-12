import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsAPI";

const postsSlice = createSlice({
    name: 'posts',
    initialState: [],
    reducers: {
        addComment(state, {payload: {id, body, username}}){
            return [
                ...state.map(post => {
                    if (post.id === id) {
                        return {
                            ...post,
                            comments: [
                                ...post.comments,
                                {
                                    id: new Date().getTime().toString(),
                                    username, body
                                }
                            ]
                        }
                    }
                    return post
                })
            ]
        },
        addPost(state, {payload}) {
            return [
                {
                    ...payload
                },
                ...state
            ]
        },
        deletePost (state, {payload}) {
            return [
                ...state.filter(post => post.id !== payload)
            ]
        }
    },
    extraReducers: {
        [fetchPosts.fulfilled]: (state, {payload}) => {
            return [...payload]
        }
    }
})

export const selectPosts = state => state.posts

export const {addComment, addPost, deletePost} = postsSlice.actions

export const postsReducer = postsSlice.reducer