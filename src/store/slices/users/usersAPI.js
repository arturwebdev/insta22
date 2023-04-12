import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function() {
        const { data: usersData } = await axios.get('https://jsonplaceholder.typicode.com/users')
        const { data: postsData } = await axios.get('https://jsonplaceholder.typicode.com/photos?limit=500')

        const data = usersData.map(user => ({
            id: user.id.toString(),
            name: user.name,
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.address.city.toLowerCase(),
            followers: Math.round(Math.random() * 300 + 700 ),
            following: Math.round(Math.random() * 300 + 700 ), 
            avatar: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`,
            bio: user.company.catchPhrase,
            posts: [
                ...postsData.filter(post => post.albumId === user.id)
                            .map(post => ({
                                id: post.id + '_' + user.id,
                                img: post.url,
                                name: user.username.toLowerCase(),
                                postText: post.title.split(' ').slice(1).join(' '),
                                likesCount: Math.round(Math.random() * 500 + 300),
                                timeAgo: Math.round(Math.random() * 7 + 2) + ' Minutes Ago',
                                comments: []
                            }))
            ]
        }))
        
        return data
    }
)