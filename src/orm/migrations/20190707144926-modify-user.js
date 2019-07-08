'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Users', 'phone', {type: Sequelize.STRING(20)}, {transaction: t}),
                queryInterface.addColumn('Users', 'pet', {type: Sequelize.STRING(20)}, {transaction: t}),
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Users', 'phone', {transaction: t}),
                queryInterface.removeColumn('Users', 'pet', {transaction: t})
            ])
        })
    }
};
