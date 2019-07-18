'use strict';
module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
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
    Permission.associate = function (models) {
        Permission.belongsToMany(models.Role, {
            through: 'RolesPermissions',
            as: 'roles',
            foreignKey: 'permissionId',
            otherKey: 'roleId'
        });
    };
    Permission.options.initialAutoIncrement = 1;
    Permission.options.tableName = "permissions"
    return Permission;
};