import { validationResult } from 'express-validator';
import BookRepository from '../Models/booksModel.js';

async function findAll(req, res) {
    const books = await BookRepository.findAll(
        {
            order: [
                ['id', 'desc']
            ]
        }
    );
    
    return res.render('index', { books, messages: req.flash('success') });
}

async function addBook(req, res) {
    const
        errors = validationResult(req),
        { title, description, status } = req.body;

    if (!errors.isEmpty()) {
        return res.render('register', { errors: errors.array(), title, description, status });
    }

    BookRepository.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    })
        .then((result) => {
            req.flash('success', 'Livro adicionado com sucesso!');
            res.redirect('/');
        });
}

export default { findAll, addBook };