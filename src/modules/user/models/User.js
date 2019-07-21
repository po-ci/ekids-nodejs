'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            initialAutoIncrement: 1,
            primaryKey: true
        },
        active: {type: DataTypes.BOOLEAN},
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                len: {args: [3,30], msg: "Username debe contener entre 3 y 30 caracteres"},
                notEmpty: {msg: "Username no puede estar vacio"}
            },
            unique: {
                args: true,
                msg: 'username already in use!'
            }

        },
        password: {
            type: DataTypes.STRING(100),
            validate: {
                notEmpty: {msg: "Password no puede estar vacio"}
            },
        },
        name: {type: DataTypes.STRING(59)},
        email: {
            type: DataTypes.STRING(100),
            validate: {
                isEmail: {msg: "Email debe ser una dirección de email valida",},
                notEmpty: {msg: "Email no puede estar vacio"}
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
        User.belongsTo(models.Role,{as: "role", foreignKey: "role_id"});
    };
    User.options.initialAutoIncrement = 1;
    User.options.tableName = "users"
    return User;
};