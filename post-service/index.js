const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = 4000;

const posts = {};

app.get('/posts', (req, res) => {
  res.status(200).send(posts);
});

app.post('/posts/create', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  axios
    .post('http://localhost:4005/events', {
      type: 'PostCreated',
      postId: id,
      post: title,
    })
    .then(() => {
      console.log('Successfully emmited post created event');
    })
    .catch((error) => {
      console.log(
        'There was an error while emmiting post created event: ',
        error
      );
    });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Post Service live at port: ${PORT}`);
});
