const model = require('../../models');

const getAllBooks = async (req, res, next) => {
    try {
        const books = await model.books.findAll();
        res.json(books);
    } catch (error) {
        next(error);
    }
};

const getBookById = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const book = await model.books.findByPk(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        next(error);
    }
};

const createBook = async (req, res, next) => {
    try {
        const newBookData = req.body;
        const newBook = await model.books.create(newBookData);

        res.status(201).json(newBook);
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const updatedBookData = req.body;

        // Update the book data
        const [updatedRowsCount, updatedBook] = await model.books.update(updatedBookData, {
            where: { id: bookId },
            returning: true,
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(updatedBook[0]); // Return the updated book
    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;

        // Delete the book
        const deletedRowCount = await model.books.destroy({ where: { id: bookId } });

        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(204).end(); // No content for successful deletion
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};