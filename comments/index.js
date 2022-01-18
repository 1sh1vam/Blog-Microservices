const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    res.send(commentsByPostId[id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;

    const id = randomBytes(4).toString('hex');
    const comments = commentsByPostId[postId] || [];
    comments.push({id, content});

    commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4005/events', { type: 'CommentCreated', data: { postId, id, content } })

    res.status(201).send(comments)
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type)
    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on port 4001..');
});