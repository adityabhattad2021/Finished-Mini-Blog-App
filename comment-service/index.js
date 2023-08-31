const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = 4001;
const commentsByPostId = {};

app.get('/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  res.status(201).send(commentsByPostId[postId] || []);
});

app.post('/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  const newCommentId = randomBytes(4).toString('hex');
  const { comment } = req.body;
  const allComments = commentsByPostId[postId] || [];

  axios
    .post('http://localhost:4005/events', {
      type: 'CommentCreated',
      postId: postId,
      commentId: newCommentId,
      comment: comment,
    })
    .then(() => {
      console.log('Comment Created Event Emitted Successfully!');
    })
    .catch((error) => {
      console.log(
        'There was an error while emitting comment created event: ',
        error
      );
    });

  allComments.push({ commentId: newCommentId, comment });
  commentsByPostId[postId] = allComments;
  res.status(201).send(commentsByPostId[postId]);
});

app.post('/events',(req,res)=>{
    const { type } = req.body;
    switch (type) {
      case 'PostCreated':
        const { postId, post } = req.body;
        console.log(
          `Catched post created event, Post: ${post} with Id: ${postId}`
        );
        res.send({}).status(200);
        break;
      case 'CommentCreated':
        const { postId: parentPostId, commentId, comment } = req.body;
        console.log(
          `Catched comment created event, Comment: ${comment} with comment id: ${commentId}`
        );
        res.send({}).status(200);
        break;
      default:
        break;
    }
})

app.listen(PORT, () => {
  console.log(`Comment Service is live at port: ${PORT}`);
});
