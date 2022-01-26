const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('Received event ', type);

    if (type === 'CommentCreated') {
        const { id, postId, content } = data
        const status = content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: { ...data, status, content }
        });
    };

    res.send({})
});

app.listen(4003, () => {
    console.log('listening at port 4003');
});