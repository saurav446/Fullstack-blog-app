import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Component/context/Context';
import './Login.css'
import { useForm } from "react-hook-form";   

const Login = () => { 
  
     const userRef = useRef();
     const passwordRef = useRef();
    const { dispatch, isFetching }  = useContext(Context);

      const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
       try{
        const res = await axios.post("https://blooming-tundra-50823.herokuapp.com/api/auth/login", {
            username: userRef.current.value,
            password: passwordRef.current.value
        })
        dispatch({type: "LOGIN_SUCCESS",payload: res.data})
       }catch(err){
       dispatch({type: "LOGIN_FAILURE"})
       } 
      }
       
    return (
        <div className="login"> 
        <span className="loginTitle"> Login  </span>
        <form className="loginForm" onSubmit={handleSubmit }>
          <label>Username</label>
          <input ref={userRef} 
          className="loginInput" type="text" placeholder="Enter your username..." required/>
            
          <label>Password</label>
          <input ref={passwordRef} className="loginInput" type="password" placeholder="Enter your password..." required/>
          <button disabled={isFetching} className="loginButton" type="submit">Login</button>
        </form>
          <button className="loginRegisterButton">
          <Link className="link" to="/register"> Register</Link> 
            </button>
      </div>
    );
};

export default Login;