import { validationResult } from 'express-validator';
import BookRepository from '../Models/booksModel.js';

async function findAll(req, res) {
    const
        books = await BookRepository.findAll(
            {
                order: [
                    ['id', 'desc']
                ]
            }
        );

    return res.render('index', {
        books,
        message: {
            success: req.flash('success'),
            warning: req.flash('warning'),
            danger: req.flash('danger')
        }
    });
}

async function findBook(req, res) {
    const
        book = await BookRepository.findByPk(req.params.id);

    if (!book) {
        req.flash('warning', 'Este livro não está cadastrado.');
        return res.redirect('/');
    }

    return res.render('view', {
        book,
        message:
        {
            success: req.flash('success'),
            warning: req.flash('warning'),
            danger: req.flash('danger')
        }
    });
}

async function addBook(req, res) {
    const
        errors = validationResult(req),
        { title, description, status } = req.body;

    if (!errors.isEmpty()) {
        return res.render('register', {
            errors: errors.array(),
            title,
            description,
            status,
            message: {
                success: req.flash('success'),
                warning: req.flash('warning'),
                danger: req.flash('danger')
            }
        });
    }

    BookRepository.create(
        {
            title: title,
            description: description,
            status, status
        }
    )
        .then((result) => {
            req.flash('success', 'Livro adicionado com sucesso!');
            return res.redirect('/view/' + result.id);
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

    const
        { title, description, status } = await book;

    return res.render('edit', {
        book,
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
}

async function updateBook(req, res) {
    const
        book = await BookRepository.findByPk(req.params.id);

    if (!book) {
        req.flash('danger', 'Houve um erro interno no sistema.');
        return res.redirect('/');
    }

    const
        errors = validationResult(req),
        { title, description, status } = req.body;

    if (!errors.isEmpty()) {
        return res.render('edit', {
            book,
            errors: errors.array(),
            title,
            description,
            status,
            message: {
                success: req.flash('success'),
                warning: req.flash('warning'),
                danger: req.flash('danger')
            }
        });
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

async function deleteBook(req, res) {
    const
        book = await BookRepository.findByPk(req.params.id);

    if (!book) {
        req.flash('warning', 'Este livro não está cadastrado.');
        return res.redirect('/');
    }

    if (req.query.delete == 'true') {
        await BookRepository.destroy(
            {
                where: {
                    id: book.id
                }
            }
        );

        req.flash('success', 'Livro excluído com sucesso!');
        return res.redirect('/');
    }

    return res.render('delete', { book });
}

export default { findAll, findBook, addBook, editBook, updateBook, deleteBook };