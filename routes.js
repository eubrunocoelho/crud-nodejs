import express from 'express';
import { body } from 'express-validator';
import books from './src/Controllers/books.js';

const routes = express.Router();

routes.get('/', async (req, res) => {
    await books.findAll(req, res);
});

routes.get('/view/:id', async (req, res) => {
    await books.findBook(req, res);
});

routes.get('/register', (req, res) => {
    const
        { title, description, status } = {};

    return res.render('register', {
        errors: null,
        title,
        description,
        status,
        message: {
            success: req.flash('success'),
            warning: req.flash('warning'),
            danger: req.flash('danger')
        }
    });
});

routes.post('/register', [
    body('title')
        .notEmpty()
        .withMessage('O campo "título" é obrigatório.'),

    body('title')
        .trim()
        .isLength({ min: 3, max: 255 })
        .withMessage('O campo "título" deve ter entre 3 e 255 caracteres.'),

    body('description')
        .optional({ nullable: true })
        .trim()
        .isLength({ max: 65535 })
        .withMessage('O campo "descrição" excede o tamanho permitido.'),

    body('status')
        .notEmpty()
        .withMessage('O campo "status" é obrigatório.')
], async (req, res) => {
    await books.addBook(req, res);
})

routes.get('/edit/:id', async (req, res) => {
    await books.editBook(req, res);
});

routes.post('/edit/:id', [
    body('title')
        .notEmpty()
        .withMessage('O campo "título" é obrigatório.'),

    body('title')
        .trim()
        .isLength({ min: 3, max: 255 })
        .withMessage('O campo "título" deve ter entre 3 e 255 caracteres.'),

    body('description')
        .optional({ nullable: true })
        .trim()
        .isLength({ max: 65535 })
        .withMessage('O campo "descrição" excede o tamanho permitido.'),

    body('status')
        .notEmpty()
        .withMessage('O campo "status" é obrigatório.')
], async (req, res) => {
    await books.updateBook(req, res);
});

export { routes as default };