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

    return res.render('index', { books, message: { success: req.flash('success'), warning: req.flash('warning'), danger: req.flash('danger') } });
}

async function findBook(req, res) {
    const book = await BookRepository.findByPk(req.params.id);

    if (!book) {
        req.flash('warning', 'Este livro não está cadastrado.');
        return res.redirect('/');
    }

    return res.render('view', { book, message: { success: req.flash('success'), warning: req.flash('warning'), danger: req.flash('danger') } });
}

async function addBook(req, res) {
    const
        errors = validationResult(req),
        { title, description, status } = req.body;

    if (!errors.isEmpty()) {
        return res.render('register', { errors: errors.array(), title, description, status, message: { success: req.flash('success'), warning: req.flash('warning'), danger: req.flash('danger') } });
    }

    BookRepository.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    })
        .then((result) => {
            req.flash('success', 'Livro adicionado com sucesso!');
            return res.redirect('/');
        })
        .catch((error) => {
            req.flash('danger', 'Houve um erro interno no sistema.');
            return res.redirect('/');
        });
}

async function editBook(req, res) {
    const
        book = await BookRepository.findByPk(req.params.id);

    if (!book) {
        req.flash('warning', 'Este livro não está cadastrado.');
        return res.redirect('/');
    }

    return res.render('edit', { errors: null, id: book.id, title: book.title, description: book.description, status: book.status, message: { success: req.flash('success'), warning: req.flash('warning'), danger: req.flash('danger') } });
}

async function updateBook(req, res) {
    const
        book = await BookRepository.findByPk(req.params.id),
        errors = validationResult(req),
        { title, description, status } = req.body;

    if (!book) {
        req.flash('danger', 'Houve um erro interno no sistema.');
        return res.redirect('/');
    }

    if (!errors.isEmpty()) {
        return res.render('edit', { errors: errors.array(), id: book.id, title, description, status, message: { success: req.flash('success'), warning: req.flash('warning'), danger: req.flash('danger') } });
    }

    await BookRepository.update(
        {
            title: title,
            description: description,
            status: status
        },
        {
            where: {
                id: book.id
            }
        }
    )
        .then((result) => {
            req.flash('success', 'Livro atualizado com sucesso!');
            return res.redirect('/view/' + book.id);
        })
        .catch((error) => {
            req.flash('danger', 'Houve um erro interno no sistema.');
            return res.redirect('/');
        });
}

export default { findAll, findBook, addBook, editBook, updateBook };