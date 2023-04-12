import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import IMAGES from '../../images'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../store/slices/posts/postsSlice'
import { selectUsers } from '../../store/slices/users/usersSlice'

function Post({id, img, comments, name, likesCount, postText, timeAgo}) {
    const dispatch = useDispatch()
    const formRef = useRef(null)
    const {currentUser} = useSelector(selectUsers)
    const handleSubmit = (e) => {
        e.preventDefault()
        
        dispatch(addComment({
            body: formRef.current[0].value,
            username: currentUser.username,
            id
        }))

        formRef.current.reset()
    }

  return (
    <div className="post">
        <div className="info">
            <NavLink style={{textDecoration: 'none'}} to={`${id}/uniq`} className="user">
                <div className="profile-pic"><img src={img} alt="" /></div>
                <p className="username">{name}</p>
            </NavLink>
            <img src={IMAGES.option} className="options" alt=""/>
        </div>
        <img src={img} className="post-image" alt=""/>
        <div className="post-content">
            <div className="reaction-wrapper">
                <img src={IMAGES.like} className="icon" alt=""/>
                <img src={IMAGES.comment} className="icon" alt=""/>
                <img src={IMAGES.send} className="icon" alt=""/>
                <img src={IMAGES.save} className="save icon" alt=""/>
            </div>
            <p className="likes">{likesCount}</p>
            <p className="description"><span>{name} </span> {postText}</p>
            <p className="post-time">{timeAgo}</p>
            {
                comments.map(comment => (
                    <p key={comment.id} className="description"><span>{comment.username} </span> {comment.body}</p>
                ))
            }
        </div>
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="comment-wrapper">
                <img src={IMAGES.smile} className="icon" alt=""/>
                <input type="text" className="comment-box" placeholder="Add a comment"/>
                <button className="comment-btn">post</button>
            </div>
        </form>
    </div>
  )
}

export default Post