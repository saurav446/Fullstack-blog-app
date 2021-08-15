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

   useEffect(() =>{
      const  getpost = async () =>{
        const res = await axios.get("/posts/" + path);
         setPost(res.data)
      }
      getpost()
   },[path]);

   
  const PF = "http://localhost:5000/images/";

  const handleDelete = async () =>{
    try{ 
      await axios.delete(`/posts/${post._id}`,
       {data:{username: user.username}});
      window.location.replace("/")
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
           
          <h1 className="singlePostTitle">
            {post.title}
            {
              post.username === user?.username && (
                <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit"></i>
                <i className="singlePostIcon far fa-trash-alt"
                onClick={handleDelete}></i>
              </div>
              ) }
             
          </h1>
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
          <p className="singlePostDesc">
            {post.desc}
            </p>
        </div>
        
        
      </div>
    );
};

export default SinglePost;