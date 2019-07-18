'use strict';
module.exports = (sequelize, DataTypes) => {
    const RolesPermissions = sequelize.define('RolesPermissions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            initialAutoIncrement: 1,
            primaryKey: true
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Role',
                key: 'id'
            }
        },
        permissionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Permission',
                key: 'id'
            }
        }
    });
    RolesPermissions.options.tableName = "roles_permissions"
    return RolesPermissions;
};