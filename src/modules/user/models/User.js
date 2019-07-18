'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            initialAutoIncrement: 20,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(30),
            unique: {
                args: true,
                msg: 'username already in use!'
            }

        },
        password: {type: DataTypes.STRING(100),},
        name: {type: DataTypes.STRING(59)},
        email: {
            type: DataTypes.STRING(100),
            validate: {
                isEmail: {
                    msg: "Must be a valid email address",
                },
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        phone: {type: DataTypes.STRING(20)},
        avatar: {type: DataTypes.STRING(100)},
        avatarurl: {type: DataTypes.STRING(120)},
    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    User.options.initialAutoIncrement = 1;
    User.options.tableName = "users"
    return User;
};