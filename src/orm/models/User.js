'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            initialAutoIncrement: 20,
            primaryKey: true
        },
        firstName: {type: DataTypes.STRING(32)},
        lastName: {type: DataTypes.STRING(32)},
        email: {type: DataTypes.STRING(100)},
        phone: {type: DataTypes.STRING(20)},
    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    User.options.initialAutoIncrement = 22;
    User.options.tableName = "users"
    return User;
};