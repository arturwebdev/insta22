import React, { useRef } from 'react';
import IMAGES from '../../images';
import './CreatePost.css'
import { addPost as addPost_posts } from '../../store/slices/posts/postsSlice';
import { addPost as addPost_users, selectUsers } from '../../store/slices/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const dispatch = useDispatch()
    const {currentUser} = useSelector(selectUsers)
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const post = {
            id: new Date().getTime().toString(),
            img: formRef.current[0].value,
            name: currentUser.username,
            postText: formRef.current[1].value,
            likesCount: Math.round(Math.random() * 500 + 300),
            timeAgo: Math.round(Math.random() * 7 + 2) + ' Minutes Ago',
            comments: []
        }

        dispatch(addPost_posts(post))
        dispatch(addPost_users(post))
        navigate('/')
        formRef.current.reset()
    }
    return (
        <div style={{marginTop: '100px', textAlign: 'center'}} className='container'>
            <h1 style={{fontSize: '50px' }}>Create Post</h1>
            <br/>
            <img style={{margin:'auto'}} width='100px' src={IMAGES.createPost} alt="" />   
            <br/>

            <form ref={formRef} onSubmit={handleSubmit} style={{marginTop: '50px'}} >
                <input type="text" placeholder='img' /><br/><br/>
                <input type="text" placeholder='desc' /><br/><br/>
                <label className="input-file">
                    <input type="submit" style={{display: 'none'}} name="file"/>		
                    <span>Выберите файл</span>
                </label>
            </form>
        </div>
    );
}

export default CreatePost;
