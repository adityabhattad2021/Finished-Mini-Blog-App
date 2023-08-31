const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const PORT = 4003;

const allPosts = {};

app.post('/events', (req, res) => {
  const { type } = req.body;
  if (type === 'PostCreated') {
    const { postId, post } = req.body;
    console.log(`Catched post created event, Post: ${post} with Id: ${postId}`);
    allPosts[postId] = {
      postId: postId,
      post: post,
      comments: [],
    };
    res.send({}).status(200);
  } else if (type === 'CommentCreated') {
    console.log(req.body);
    const { postId, commentId, comment } = req.body;
    console.log(
      `Catched comment created event, Comment: ${comment} with comment id: ${commentId} and post id ${postId}`
    );
    allPosts[postId].comments.push({
      commentId: commentId,
      comment: comment,
    });
    console.log(allPosts);
    res.send({}).status(200);
  }
});

app.get('/query/all-posts', (req, res) => {
  res.send(allPosts).status(201);
});

app.listen(PORT, () => {
  console.log(`Query service live at port: ${PORT}`);
});
