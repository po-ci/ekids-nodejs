'use strict';
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            initialAutoIncrement: 1,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(30),
            unique: {
                args: true,
                msg: 'rolname already in use!'
            }

        },

    }, {});
    Role.associate = function (models) {
        Role.belongsToMany(models.Permission, {
            through: 'RolesPermissions',
            as: 'permissions',
            foreignKey: 'roleId',
            otherKey: 'permissionId'
        });
    };
    Role.options.initialAutoIncrement = 1;
    Role.options.tableName = "roles"
    return Role;
};