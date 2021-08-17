import React, { useEffect, useState } from 'react';
import Header from '../../Component/Header/Header'; 
import Posts from '../../Component/Posts/Posts.jsx';
import Sidebar from '../../Component/Sidebar/Sidebar.jsx'
import './Home.css';
import axios from "axios" 
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [post,setPost] = useState([])
  const {search} = useLocation();
     
  useEffect(() =>{
     const fetchPosts =  async () =>{
       const res = await   
       axios.get("https://blooming-tundra-50823.herokuapp.com/api/posts/" + search);
       setPost(res.data) 
     }
     fetchPosts();   
  },[search])

    return (
        <>
         <Header /> 
        <div className="home">
          <Posts post={post}/> 
          <Sidebar />
        </div>
        </>
    );
};

export default Home;


// "proxy" : "http://localhost:5000/api/"
