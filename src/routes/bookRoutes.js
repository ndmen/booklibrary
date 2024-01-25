const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Get all books
router.get('/', bookController.getAllBooks);

// Get a specific book by ID
router.get('/:id', bookController.getBookById);

// Create a new book (only for admin)
router.post('/', authMiddleware, roleMiddleware('admin'), bookController.createBook);

// Update a book (only for admin)
router.patch('/:id', authMiddleware, roleMiddleware('admin'), bookController.updateBook);

// Delete a book (only for admin)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), bookController.deleteBook);

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books
 *     tags: [Books]
 *     responses:
 *       '200':
 *         description: A successful response with the list of books
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a specific book by ID
 *     description: Retrieve information about a specific book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A successful response with the book information
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Create a new book entry (only for admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: integer
 *               genre:
 *                 type: string
 *             required:
 *               - title
 *               - author
 *               - year
 *               - genre
 *     responses:
 *       '201':
 *         description: A successful response with the created book
 *       '403':
 *         description: Forbidden, only admins can create books
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Update a book by ID
 *     description: Update information about a specific book (only for admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: integer
 *               genre:
 *                 type: string
 *             required:
 *               - title
 *               - author
 *               - year
 *               - genre
 *     responses:
 *       '200':
 *         description: A successful response with the updated book
 *       '403':
 *         description: Forbidden, only admins can update books
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     description: Delete a specific book (only for admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: No content for successful deletion
 *       '403':
 *         description: Forbidden, only admins can delete books
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */

module.exports = router;