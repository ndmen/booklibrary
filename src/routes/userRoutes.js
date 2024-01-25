const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Get all users (only for admin)
router.get('/', authMiddleware, roleMiddleware('admin'), userController.getAllUsers);

// Get a specific user by ID (only for admin)
router.get('/:id', authMiddleware, roleMiddleware('admin'), userController.getUserById);

// Create a new user (only for admin)
router.post('/', authMiddleware, roleMiddleware('admin'), userController.createUser);

// Update a user (only for admin)
router.patch('/:id', authMiddleware, roleMiddleware('admin'), userController.updateUser);

// Delete a user (only for admin)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), userController.deleteUser);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users (only for admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response with the list of users
 *       '403':
 *         description: Forbidden, only admins can retrieve users
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a specific user by ID
 *     description: Retrieve information about a specific user (only for admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A successful response with the user information
 *       '403':
 *         description: Forbidden, only admins can retrieve users
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Register a new user (only for admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: integer
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '201':
 *         description: A successful response with the created user
 *       '403':
 *         description: Forbidden, only admins can create users
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     description: Update information about a specific user (only for admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: integer
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: A successful response with the updated user
 *       '403':
 *         description: Forbidden, only admins can update users
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a specific user (only for admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: No content for successful deletion
 *       '403':
 *         description: Forbidden, only admins can delete users
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

module.exports = router;