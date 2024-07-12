import React from 'react'
import './Header.css'
import {Routes, Route, Link} from 'react-router-dom'

const Header = () => {
  return (
   <>
        <header className="header">
            <div className="logo">GPT_VETTING</div>
            <nav className="nav-links">
                <ul  className='nav-links'>
                    <li><a href = ''>Home </a></li>
                    <li><a href = ''>About</a></li>
                    <li><a href = ''>Contact</a></li>
                    <li><a href = ''>Start Vetting</a></li>
                    <li className='reg_button'> <a  href=''><button> Sign up</button></a></li>
                    <li className='login_button'><a  href=''><button> Login</button></a></li>
                </ul>
            </nav> 
        </header>     
   </>
  )
}

export default Header
