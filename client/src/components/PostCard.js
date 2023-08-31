import { useEffect, useState } from 'react';
import Commentlist from './Commentlist';
import CreateComment from './CreateComment';
import axios from "axios";

export default function PostCard({ post }) {
  const [newComment, setNewComment] = useState('');
  const [allComments,setAllComments]=useState(post.comments||[]);

  async function handleCreateComment(){
    let response=null;
    try{
      response = await axios.post(`http://localhost:4001/posts/${post.postId}/comments`,{comment:newComment});
    }catch(error){
      console.log(error);
    }finally{
      setNewComment("");
      setAllComments(response.data);
      console.log(response);
    }
  }

  // function fetchAllComments(){
  //   axios.get(`http://localhost:4001/posts/${post.id}/comments`).then((result)=>{
  //     console.log(result.data);
  //     setAllComments(result.data);
  //   }).catch((error)=>{
  //     console.log(error);
  //   })
  // }

  return (
    <div className='border-2 h-64 rounded-3xl p-4'>
      <h1 className='font-bold text-2xl'>{post.post}</h1>
      <hr className='my-3' />
      <CreateComment 
        handleCreateComment={handleCreateComment}
        newComment={newComment}
        setNewComment={setNewComment}
      />
      <Commentlist
        allComments={allComments}
      />
    </div>
  );
}
