import express from 'express';

const app = express();

//Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));

//Routes
app.get('/', (req, res) => {
    res.send('It works!');
});


app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));

