import React, { useState } from "react";
import Login from "../Login/Login"
import "./Signup.css";
import { backendUrl } from "../../constants.js";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div id='signup' className='flex-col'>
      <h1>Signup</h1>
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
          <label htmlFor='email'>Email: </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type='text'
            name='email'
            placeholder='Your Email'
          />
        </div>

        <div className='subform'>
          <label htmlFor='password'>Password: </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            name='password'
            placeholder='Your Password'
          />
        </div>

        <button
          type='submit'
          onClick = {async () => {
            const response = await fetch(`${backendUrl}/signup`, {
              method: "POST",
              headers:{
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                username: username,
                email: email,
                password: password,
              }),
              });
              const json =  await response.json();
              console.log(json);
          }}
        >
          SIGNUP
        </button>
        <Link to="/Login" style={{textAlign:"center",margin:"auto"}}>Already Signed In ? Log In</Link>
      </div>
    </div>
  );
};

export default Signup;

