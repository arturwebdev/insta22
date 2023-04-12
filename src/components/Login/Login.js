import { useRef } from "react"
import "./Login.css"

import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { logIn, selectUsers } from "../../store/slices/users/usersSlice"
import { useEffect } from "react"
import { fetchUsers } from "../../store/slices/users/usersAPI"
import { useNavigate } from "react-router-dom"


function Login() {
  const formRef = useRef(null)
  const dispatch = useDispatch()
  const {usersData, currentUser} = useSelector(selectUsers)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])

  useEffect(() => {
    if (!usersData.length) {
      dispatch(fetchUsers())
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const [{value: login}, {value: password}] = formRef.current

    dispatch(logIn({login, password}))
    formRef.current.reset()
  }
  return (
    <div className="Login">
<div className="container">
  <div className="box">
    <div className="heading" />
    <form ref={formRef} onSubmit={handleSubmit} className="login-form">
      <div className="field">
        <input defaultValue={'bret'} id="username" type="name" placeholder="Phone number, username, or email" />
        <label htmlFor="username">Phone number, username, or email</label>
      </div>
      <div className="field">
        <input defaultValue={'gwenborough'} id="password" type="password" placeholder="password" />
        <label htmlFor="password">Password</label>
      </div>
      <button className="login-button" title="login">Log In</button>
      <div className="separator">
        <div className="line" />
        <p>OR</p>
        <div className="line" />
      </div>
      <div className="other">
        <button className="fb-login-btn" type="button">
          <i className="fa fa-facebook-official fb-icon" />
          <span >Log in with Facebook</span>
        </button>
        <a className="forgot-password" href="#">Forgot password?</a>
      </div>
    </form>
  </div>
  <div className="box">
    <p>Don't have an account? <a className="signup" href="#">Sign Up</a></p>
  </div>
</div>


    </div>
  )
}

export default Login