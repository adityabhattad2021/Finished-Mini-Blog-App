import { CornerDownRight } from 'lucide-react';

export default function CreateComment({
  handleCreateComment,
  newComment,
  setNewComment,
}) {
  return (
    <div className=' border-2 p-2 rounded-xl relative'>
      <input
        placeholder='Add a comment'
        className='outline-none w-[90%]'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <CornerDownRight
        className='absolute right-1 top-2 cursor-pointer'
        onClick={handleCreateComment}
      />
    </div>
  );
}
