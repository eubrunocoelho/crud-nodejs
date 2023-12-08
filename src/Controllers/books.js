import BookRepository from '../Models/booksModel.js';

async function findAll(req, res) {
    const books = await BookRepository.findAll();
    return res.render('index', { books });
}

export default { findAll };