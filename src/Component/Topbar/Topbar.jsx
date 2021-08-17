import  React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import './Topbar.css'

function Topbar() {
  const {user,dispatch} = useContext(Context);

  const handleLogout = () =>{
    dispatch({type: "LOGOUT"});
  }
  
  const PF = "https://blooming-tundra-50823.herokuapp.com/images/"
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
          <li className="topListItem">
          <Link className="link" to="/write">
              WRITE
            </Link>
          </li> 
          <li className="topListItem"
         onClick={handleLogout}>{ user && "LOGOUT"  }</li>
           
        </ul>
      </div>
        

      <div className="topRight">  
          {
            user ? 
            <Link to="/setting" >
              <img
              className="topImg" 
              src={PF + user.profilePic} 
              alt=""
            />
            </Link>
              : (
              <div className="topList"> 
                <li className="topListItem" >
                  <Link className="link" to="/login">LOGIN</Link>
                  </li>
                <li className="topListItem" >
                <Link className="link"  to="/register">REGISTER</Link>
                  </li>
              </div> 
            )
          }
             
      {/* <i className="topSearchIcon fas fa-search"></i> */}
      </div> 
      </div>
    );  
};

export default Topbar;