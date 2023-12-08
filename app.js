import express from 'express';
import db from './src/db.js';
import books from './src/Controllers/books.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', async (req, res) => {
    await books.findAll(req, res);
});

app.get('/register', (req, res) => {
    res.render('register');
});

db.sync(() => {
    console.log(`Database connected: ${process.env.DB_NAME}`);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});