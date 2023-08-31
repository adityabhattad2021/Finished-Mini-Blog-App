import { useEffect, useState } from 'react';
import './App.css';
import CreatePost from './components/CreatePost';
import Postlist from './components/Postlist';
import axios from "axios";

function App() {

  const [newPost,setNewPost]=useState("");
  const [allPosts,setAllPosts]=useState({});
  

  useEffect(()=>{
    fetchAllPosts();
  },[])

  async function handleCreatePost(){
    try{
      await axios.post("http://localhost:4000/posts/create",{title:newPost});
    }catch(error){
      console.log(error);
    }finally{
      setNewPost("");
      fetchAllPosts();
    }
  }

  function fetchAllPosts(){
    axios.get("http://localhost:4003/query/all-posts").then((result)=>{
      console.log(result.data);
      setAllPosts(result.data);
    }).catch((error)=>{
      console.log(error);
    });
  }

  return (
    <div className='h-screen flex justify-around flex-col gap-8'>
      <div className='flex flex-col justify-center items-center mt-8 md:mt-24'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-6 text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-[#5D4157] to-[#A8CABA] pb-2'>
          Mini-Blog app
        </h1>
        <p className='text-md sm:text-lg md:text-xl lg:text-2xl'>with Microservices Architecture</p>
      </div>
      <CreatePost
        newPost={newPost}
        setNewPost={setNewPost}
        handleCreatePost={handleCreatePost} />
      <Postlist allPosts={allPosts} />
    </div>
  );
}

export default App;
