import express from 'express';
import { body } from 'express-validator';
import books from './src/Controllers/books.js';

const routes = express.Router();

routes.get('/', async (req, res) => {
    await books.findAll(req, res);
});

routes.get('/register', (req, res) => {
    res.render('register', { errors: null });
});

routes.post('/register', [
    body('title').notEmpty().withMessage('O campo "título" é obrigatório.'),
    body('status').notEmpty().withMessage('O campo "status" é obrigatório.')
], async (req, res) => {
    await books.addBook(req, res);
})

export { routes as default };