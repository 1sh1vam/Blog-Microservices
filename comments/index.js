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

    await axios.post('http://event-bus-srv:4005/events', { type: 'CommentCreated', data: { postId, id, content, status: 'pending' } })

    res.status(201).send(comments)
});

app.post('/events', async (req, res) => {
    console.log('Received Event', req.body.type)
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { id, status, postId, content } = data;

        comments = commentsByPostId[postId];
        const comment = comments.find((data) => data.id === id);
        comment.status = status;
        comment.content = content;

        await axios.post('http://event-bus-srv:4005/events', { type: 'CommentUpdated', data: { postId, id, status, content }});
    }
    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on port 4001..');
});