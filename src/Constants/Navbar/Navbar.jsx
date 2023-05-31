import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from'react'
import './Navbar.css'

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);  
      setIsLoading(false);
  }, []);

  return (
    <div id='navbar-main' className='flex-row'>
      <Link to={'/'}>
        <div className="logo-box flex-row"> 
          <img className='logo' src="https://user-images.githubusercontent.com/63964149/152531278-5e01909d-0c2e-412a-8acc-4a06863c244d.png" alt="logo" /> 
          <p>ZeetCode</p>
        </div>
      </Link>
      <div className="nav-options">
        <Link to={'/problemset/all/'}>Problems</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <div className='nav-options'>
            <button onClick={()=>{
              localStorage.removeItem('token'); 
              setIsLoggedIn(false);
            }}>Log Out</button>
          </div>
        ):
        (  
        <>
          <div className="nav-options">
            <Link to={'/signup'} >Signup</Link>
          </div>
          <div className="nav-options">
            <Link to={'/login'} >Login</Link>
          </div>
        </>
        )}
      </div>
    </div>
  )
}

export default Navbar
