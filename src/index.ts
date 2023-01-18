import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('test page');
});

app.listen(3000, () => {
    console.log('Listening on 3000');
})