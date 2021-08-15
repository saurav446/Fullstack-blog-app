import React from 'react';
import Post from '../Post/Post.jsx'
import './Posts.css'

const Posts = ({post}) => {
  // console.log(post)
    return (
     <div className="posts"> 
       {
         post.map((p) =>(
           <Post post={p} />
         ))
       }

        
      
    </div>
    ); 
};

export default Posts;