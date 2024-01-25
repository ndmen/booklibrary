const jwt = require('jsonwebtoken');
const model = require('../../models');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');

        const user = await model.users.findByPk(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;
