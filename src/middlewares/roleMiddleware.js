const model = require('../../models');

const roleMiddleware = (requiredRole) => {
    return async (req, res, next) => {
        const userRole = req.user.roleId; // Assuming you have a 'role' association in your User model

        const role = await model.roles.findOne({ where: { name: requiredRole } });

        if (userRole === role.id) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
    };
};

module.exports = roleMiddleware;