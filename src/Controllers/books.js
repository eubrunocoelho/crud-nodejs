import { validationResult } from 'express-validator';
import BookRepository from '../Models/booksModel.js';

async function findAll(req, res) {
    const
        page = parseInt(req.query.page, 10) || 1,
        pageSize = 10;

    if (typeof page !== 'number' || page === 0) {
        return res.redirect('/');
    }

    await BookRepository.findAndCountAll(
        {
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [
                ['id', 'DESC']
            ]
        }
    )
        .then(({ count, rows }) => {
            const totalPages = Math.ceil(count / pageSize);

            if (page > totalPages) {
                return res.redirect('/');
            }

            res.render('index', {
                books: rows,
                totalPages,
                currentPage: page,
                message: {
                    success: req.flash('success'),
                    warning: req.flash('warning'),
                    danger: req.flash('danger')
                }
            });
        })
        .catch((error) => {
            return res.json(error);
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
}

async function storeBook(req, res) {
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
        )
            .then((result) => {
                req.flash('success', 'Livro excluído com sucesso!');
                return res.redirect('/');
            })
            .catch((error) => {
                req.flash('danger', 'Houve um erro interno no sistema.');
                return res.redirect('/');
            });
    }

    return res.render('delete', { book });
}

export default { findAll, findBook, addBook, storeBook, editBook, updateBook, deleteBook };