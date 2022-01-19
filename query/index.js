const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id } = data;
        posts[id] = { ...data, comments: [] };
    };

    if (type === 'CommentCreated') {
        const { postId, id, content, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { postId, id, content, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }
});

app.listen(4002, () => {
    console.log('listening on port 4002');
});