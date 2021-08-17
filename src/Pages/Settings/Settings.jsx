import React, { useContext,useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import './Settings.css'
import { Context } from './../../Component/context/Context';
import axios from 'axios';
const Settings = () => { 
  const [file,setFile] = useState(null); 
  const [username, setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [success,setSuccess] = useState(false);
  const {user,dispatch} = useContext(Context)
     
  const [usenameError,setUsernameError] = useState({});
  const [passError,setPassError] = useState({});
  
  const [emailError,setEmailError] = useState({});
   const handleSubmit = async (e) =>{
     e.preventDefault();
     
     const isVaild = formValidation();
     if(isVaild) {
      dispatch({type:"UPDATE_START"})
      const update = {
        userId: user._id,
        username,
        email,
        password
      }
      if(file){
       const data = new FormData();
       const filename = Date.now() + file.name;
       data.append("name", filename);
       data.append("file", file)
       update.profilePic = filename;
      try{
        await axios.post("https://blooming-tundra-50823.herokuapp.com/api/upload",data); 
      }catch(err){ }
    }
      
      try{
     const res =  await axios.put("https://blooming-tundra-50823.herokuapp.com/api/users/" + user._id,update);  
      dispatch({type:"UPDATE_SUCCESS",payload: res.data})
       setSuccess(true)
     }catch(err){ 
         
      dispatch({type:"UPDATE_FAILURE"})
     }  
     }
    
   }
   const PF = "https://blooming-tundra-50823.herokuapp.com/images/";

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
        <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">Update Your Account</span>
            <span className="settingsTitleDelete">Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
              src={file ? URL.createObjectURL(file) : PF +user.profilePic}
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>{" "}
              </label>
              <input 
                onChange={(e) => setFile(e.target.files[0])}
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                className="settingsPPInput"
              />
            </div>
            <label>Username</label>
            <input type="text" placeholder="Update your username"
             name="name" 
             onChange={(e) => setUsername(e.target.value)}
             required
             />
             {Object.keys(usenameError).map((key) => {
           return <div style={{color:'red'}}>{usenameError[key]}</div>
         })}
            <label>Email</label>
            <input type="email" placeholder="Update your email" 
            name="email"  
            onChange={(e) => setEmail(e.target.value)}
            required
            />
              {Object.keys(emailError).map((key) => {
           return <div style={{color:'red'}}>{emailError[key]}</div>
         })}
            <label>Password</label>
            <input type="password" placeholder="Update your password" 
            name="password" 
            
            onChange={(e) => setPassword(e.target.value)}
            required
            />
             {Object.keys(passError).map((key) => {
           return <div style={{color:'red'}}>{passError[key]}</div>
         })}
            <button className="settingsSubmitButton" type="submit">
              Update
            </button>
            { success && <span style={{color:"red",textAlign:'center',marginTop:'20px'}}>Profile has been updated</span>}
          </form>
        </div>
        <Sidebar />
      </div>
    );
};

export default Settings;