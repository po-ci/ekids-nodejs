const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Vocabulary extends Sequelize.Model {
    }

    Vocabulary.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            initialAutoIncrement: 20,
            primaryKey: true
        },
        en: {type: DataTypes.STRING(32)},
        es: {type: DataTypes.STRING(32)},
        enSnd: {type: DataTypes.STRING(50), field: "en_snd"},
        esSnd: {type: DataTypes.STRING(50), field: "es_snd"},
        img: {type: DataTypes.STRING(50)},

    }, {sequelize, modelName: 'Vocabulary', tableName: "vocabularies"});

    Vocabulary.associate = function (models) {
        Vocabulary.belongsTo(models.Category,{as: "cat", foreignKey: "category_id"});
    }

    return Vocabulary
}