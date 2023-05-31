import React from 'react'

import "./Login.css"
import {useState} from "react";
import {backendUrl} from "../../constants.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="login" className='flex-col'>
      <h1>Login</h1>
      <div className='signup-form'>
        <div className='subform'>
          <label htmlFor="email">Email: </label>
          <input onChange={(e) => {
            setEmail(e.target.value)
          }} type="text" name='email' placeholder='Your Email' />
        </div>

        <div className='subform'>
          <label htmlFor="password">Password: </label>
          <input onChange={(e) => setPassword(e.target.value)} type="text" name='password' placeholder='Your Password' />
        </div>

        <button type="submit" onClick={async (e) => {
          const response = await fetch(`${backendUrl}/login`, {
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          
          });

          const json = await response.json();
          localStorage.setItem("token", json.token)
          window.location.href = '/problemset/all/'
          
        }}>Login</button> 
      </div>
    </div>
  )
}

export default Login ;