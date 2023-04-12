import React, { useEffect } from 'react'
import IMAGES from '../../images'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { selectPosts } from '../../store/slices/posts/postsSlice'
import { fetchPosts } from '../../store/slices/posts/postsAPI'

function Posts() {
    const dispatch = useDispatch()
    const posts = useSelector(selectPosts)
    useEffect(() => {
      if (!posts.length) {
        dispatch(fetchPosts())
      }
    }, [])
  return (
    <>
        {
            posts.map(el => <Post key={el.id} id={el.id} comments={el.comments} img={el.img} name={el.name} likesCount={el.likesCount} postText={el.postText} timeAgo={el.timeAgo} />)
        }
    </>
  )
}

export default Posts