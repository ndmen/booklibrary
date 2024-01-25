const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    User.associate = (models) => {
        User.belongsTo(models.roles, { foreignKey: 'roleId' });
    };

    return User;
};
