import React, { useState } from 'react';
import './Register.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Register = () => {
  const [username,setUsername] = useState("");
  const [email,setEamil] = useState("");
  const [password,setPassword] = useState("");
  
  const [error,setError] = useState("");
  const [usenameError,setUsernameError] = useState({});
  const [passError,setPassError] = useState({});
  
  const [emailError,setEmailError] = useState({});

  const handleSubmit = async (e) =>{
     e.preventDefault();
     setError(false)
     
     const isVaild = formValidation();
     if(isVaild){
      try{
        const res = await axios.post("https://blooming-tundra-50823.herokuapp.com/api/auth/register",{
        username,
        email,
        password
         })
         res.data && window.location.replace("/login") 
       setUsernameError('') 
       setPassError('');
       setEmailError('')
       }catch(err){
        setError(true)
       } 
     
     }
       
  }

  const formValidation = () =>{
       const usenameError = {};
       const passError = {}; 
       const emailError = {};
       let isVaild = true;
       
       if(username.trim().length < 5){
        usenameError.firstNameShort = "Username is to short";
        isVaild = false;
       }
       if(username.trim().length > 10){
        usenameError.firstNameShort = "Username is to long";
        isVaild = false;
       }
       if(password.trim().length < 8){
        passError.passShort = "Password must be 8 character";
        isVaild = false;
       }
       if(email.trim().length < 2){
        emailError.emailShort = "Eamil is required";
        isVaild = false;
       }
       setUsernameError(usenameError);
       setPassError(passError);
       setEmailError(emailError)
        
        return isVaild;
  }
    return (
        <div className="register">
        <span className="registerTitle">Register</span>
        <form onSubmit={handleSubmit} className="registerForm">
          <label>Username</label>
          <input onChange={(e) => setUsername(e.target.value)} className="registerInput" type="text" placeholder="Enter your username..." required />
         {Object.keys(usenameError).map((key) => {
           return <div style={{color:'red'}}>{usenameError[key]}</div>
         })}
          <label>Email</label>
          <input onChange={(e) => setEamil(e.target.value)}  className="registerInput" type="Email" placeholder="Enter your email..." required />
          {Object.keys(emailError).map((key) => {
           return <div style={{color:'red'}}>{emailError[key]}</div>
         })}
          <label>Password</label>
          <input onChange={(e) => setPassword(e.target.value)}  className="registerInput" type="password" placeholder="Enter your password..." required/>
          {Object.keys(passError).map((key) => {
           return <div style={{color:'red'}}>{passError[key]}</div>
         })}
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