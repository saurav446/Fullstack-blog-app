import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SinglePost.css'
import axios  from 'axios';
import { Context } from '../context/Context';

const SinglePost = () => {
  const {user} = useContext(Context)
  const loction = useLocation(); 
  const path = loction.pathname.split("/")[2];
  const [post,setPost] = useState({});
   
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [updateMode,setUpdateMode] = useState(false)

   useEffect(() =>{
      const  getpost = async () =>{
        const res = await axios.get("https://blooming-tundra-50823.herokuapp.com/api/posts/" + path);
         setPost(res.data)
         setTitle(res.data.title)
         setDesc(res.data.desc)
      }
      getpost()
   },[path]);

   
  const PF = "https://blooming-tundra-50823.herokuapp.com/images/";

  const handleDelete = async () =>{
    try{ 
      await axios.delete(`https://blooming-tundra-50823.herokuapp.com/api/posts/${post._id}`,
       {data:{username: user.username}});
      window.location.replace("/")
    }catch(err) {}
 
  }

  const handleUpdate = async () =>{
    try{ 
      await axios.put(`https://blooming-tundra-50823.herokuapp.com/api/posts/${post._id}`,
        {username: user.username,
          title,
          desc
        }); 
      setUpdateMode(false)
    }catch(err) {}
  }

    return (
        <div className="singlePost">
        <div className="singlePostWrapper">
          {  post.photo && (
          <img
            className="singlePostImg"
            src={PF + post.photo}
            alt=""
          />  )  }

          {
            updateMode ?
             <input type="text"
              className="singlePostTitleInput" 
              autoFocus
              
             onChange={(e) => setTitle(e.target.value)}
              value={title} /> 
             : (
              <h1 className="singlePostTitle">
              {title}
              {
                post.username === user?.username && (
                  <div className="singlePostEdit">
                  <i className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                  ></i>
                  <i className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}></i>
                </div>
                ) }
               
            </h1>
            )
          }
 
          <div className="singlePostInfo">
            <span>
              Author:
              <b className="singlePostAuthor">
               <Link className="link" to={`/?user=${post.username}`}> 
                  {post.username}
                </Link>
              </b>
            </span>
            <span>{new Date(post.createdAt).toDateString()}</span>
          </div>

          {
            updateMode ? <textarea 
             className="singlePostDescInput" 
             onChange={(e) => setDesc(e.target.value)}
              value={desc} /> : (
              <p className="singlePostDesc">
              {desc}
              </p>
            )
          }

          {
            updateMode && 
            <button 
         onClick={handleUpdate}
         className="singlePostButton" >
           Update
         </button>
          }
          
        </div>
        
        
      </div>
    );
};

export default SinglePost;