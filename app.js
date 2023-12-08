const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});