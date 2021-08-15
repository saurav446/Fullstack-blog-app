import  React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import './Topbar.css'

function Topbar() {
  const {user,dispatch} = useContext(Context);

  const handleLogout = () =>{
    dispatch({type: "LOGOUT"});
  }
    return (
        <div className="top">
        <div className="topLeft">
          <i className="topIcon fab fa-facebook-square"></i>
          <i className="topIcon fab fa-instagram-square"></i> 
          <i className="topIcon fab fa-twitter-square"></i>
        </div>

        <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
          <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
          <Link className="link" to="/write">
              WRITE
            </Link>
          </li> 
          <li className="topListItem"
         onClick={handleLogout}>{ user && "LOGOUT"  }</li>
          <li className="topListItem" >REGISTER</li>
        </ul>
      </div>
        

      <div className="topRight">  
          {
            user && 
            <img
              className="topImg" 
              src={user.profilePic} 
              alt=""
            /> 
          }
             
      <i className="topSearchIcon fas fa-search"></i>
      </div> 
      </div>
    );  
};

export default Topbar;