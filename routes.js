import express from 'express';
import books from './src/Controllers/books.js';

const routes = express.Router();

routes.get('/', async (req, res) => {
    await books.findAll(req, res);
});

routes.get('/register', (req, res) => {
    res.render('register');
});

export { routes as default };