'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: DataTypes.STRING(30),
        unique: true
      },
      password: {type: DataTypes.STRING(100),},
      name: {type: DataTypes.STRING(59)},
      email: {
        type: DataTypes.STRING(100),
        unique: true
      },
      phone: {type: DataTypes.STRING(20)},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};