import express from 'express';
import db from './src/db.js';

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

db.sync(() => {
    console.log('OK');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});