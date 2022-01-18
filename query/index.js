const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/posts', (req, res) => {

});

app.post('/events', (req, res) => {
    const { type, pos }
});

app.listen(4002, () => {
    console.log('listening on port 4005');
});