export default function Commentlist({ allComments }) {
  const reversedComments = [...allComments].reverse();

  return (
    <div className='h-32 flex flex-col gap-2 p-4 overflow-y-scroll'>
      {reversedComments.map((comment) => {
        return <li key={comment.commentId}>{comment.comment}</li>;
      })}
    </div>
  );
}
