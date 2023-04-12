import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { useSelector } from 'react-redux'
import { selectUsers } from '../store/slices/users/usersSlice'
import { useEffect } from 'react'

function HomeWrapper() {
  const navigate = useNavigate()
  const {currentUser} = useSelector(selectUsers)
  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser]) 
  return (
    <div>
    <Navbar />
    <Outlet />
    </div>
  )
}

export default HomeWrapper