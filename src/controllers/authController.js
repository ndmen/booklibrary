const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const model = require('../../models');

const generateToken = (userId, username, roleId) => {
    const payload = {
        userId,
        username,
        roleId,
    };

    const options = {
        expiresIn: '24h',
    };

    return jwt.sign(payload, 'your_secret_key', options);
};

const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await model.users.findOne({ where: { username } });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user.id, user.username, user.roleId);

        res.json({ token });
    } catch (error) {
        next(error);
    }
};

const signup = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await model.users.create({ username, password: hashedPassword, roleId: 2 });

        const token = generateToken(user.id, user.username, user.roleId);

        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    signup,
};