import React from 'react'

import "./Login.css"
import {useState} from "react";
import {backendUrl} from "../../constants.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <div id="login" className='flex-col'>
      <h1>Login</h1>
      <div className='signup-form'>
      <div className='subform'>
          <label htmlFor='username'>Username: </label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type='text'
            name='username'
            placeholder='Your Username'
          />
        </div>

        <div className='subform'>
          <label htmlFor="password">Password: </label>
          <input onChange={(e) => setPassword(e.target.value)} type="text" name='password' placeholder='Your Password' />
        </div>

        <button type="submit" onClick={async (e) => {
          e.preventDefault();
          try{
          const response = await fetch(`${backendUrl}/login`, {
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
         
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const json = await response.json();
          if(json.token){
            localStorage.setItem("token", json.token)
            navigate('/problemset/all/');
          }else{
            alert('login failed');
          }
          window.location.reload();
         
        }
        catch (error) {
          console.error('Error during login:', error);
          alert('Login failed. Please try again later.');
        } 
          
          
        }}>Login</button> 
      </div>
    </div>
  )
}

export default Login ;