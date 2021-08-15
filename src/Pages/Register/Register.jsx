import React, { useState } from 'react';
import './Register.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Register = () => {
  const [username,setUsername] = useState("");
  const [email,setEamil] = useState("");
  const [password,setPassword] = useState("");
  
  const [error,setError] = useState("");

  const handleSubmit = async (e) =>{
     e.preventDefault();
     setError(false)
     try{
      const res = await axios.post("/auth/register",{
      username,
      email,
      password
       })
       res.data && window.location.replace("/login")
     }catch(err){
      setError(true)
     }  
  }
    return (
        <div className="register">
        <span className="registerTitle">Register</span>
        <form onSubmit={handleSubmit} className="registerForm">
          <label>Username</label>
          <input onChange={(e) => setUsername(e.target.value)} className="registerInput" type="text" placeholder="Enter your username..." />
          <label>Email</label>
          <input onChange={(e) => setEamil(e.target.value)}  className="registerInput" type="Email" placeholder="Enter your email..." />
          <label>Password</label>
          <input onChange={(e) => setPassword(e.target.value)}  className="registerInput" type="password" placeholder="Enter your password..." />
          <button className="registerButton">Register</button>
        </form>
        <Link to="/login" >
           <button className="registerLoginButton">Login</button>
        </Link>
        { error && 
        <p style={{color:'red'}}>
        !please try again something was wronge</p>}
          
      </div>
    );
};

export default Register;