import { useState } from 'react';
import { CornerDownRight } from 'lucide-react';

export default function CreatePost({handleCreatePost,newPost,setNewPost}) {

  return (
    <section className='w-screen flex items-center justify-center relative'>
      <input
        className='w-[80%] sm:w-[75%] md:w-[70%] lg:w-[60%] border-2 p-3 rounded-3xl'
        placeholder='Write your post here...'
        value={newPost}
        onChange={(e)=>setNewPost(e.target.value)}
      />
      <CornerDownRight
          onClick={handleCreatePost}
          className='absolute right-14 sm:right-32 md:right-44 lg:right-80 cursor-pointer' 
      />
    </section>
  );
}
