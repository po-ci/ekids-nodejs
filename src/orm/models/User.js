'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            initialAutoIncrement: 20,
            primaryKey: true
        },
        username: {type: DataTypes.STRING(30)},
        password: {type: DataTypes.STRING(100)},
        name: {type: DataTypes.STRING(59)},
        email: {type: DataTypes.STRING(100)},
        phone: {type: DataTypes.STRING(20)},
        avatar: {type: DataTypes.STRING(100)},
    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    User.options.initialAutoIncrement = 1;
    User.options.tableName = "users"
    return User;
};