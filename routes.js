import express from 'express';
import { body, validationResult } from 'express-validator';
import books from './src/Controllers/books.js';

const routes = express.Router();

routes.get('/', async (req, res) => {
    await books.findAll(req, res);
});

routes.get('/register', (req, res) => {
    res.render('register');
});

routes.post('/register', [
    body('title').notEmpty().withMessage('O campo "título" é obrigatório.'),
    body('status').isEmail().withMessage('O campo "status" é obrigatório.')
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }
});

export { routes as default };