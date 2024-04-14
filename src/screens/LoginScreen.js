import React from 'react'
import './LoginScreen.css'
import logo from '../assets/logo.png'

function LoginScreen() {
  return (
    <div className='loginScreen'>
        <div className="loginScreen__background">
            <img className='loginScreen__logo'
            src={logo}/>
        </div>
    </div>
  )
}

export default LoginScreen