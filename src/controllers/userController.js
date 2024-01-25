const model = require('../../models');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await model.users.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await model.users.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const newUser = await model.users.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updatedUser = await model.users.update(req.body, { where: { id: userId }, returning: true });

        if (updatedUser[0] === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser[1][0]); // Return the updated user
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const deletedRowCount = await model.users.destroy({ where: { id: userId } });

        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(204).end(); // No content for successful deletion
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};