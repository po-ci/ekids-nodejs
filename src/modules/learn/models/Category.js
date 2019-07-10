
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Category extends Sequelize.Model {
    }

    Category.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            initialAutoIncrement: 20,
            primaryKey: true
        },
        name: {type: DataTypes.STRING(32)},
        description: DataTypes.TEXT
    }, {sequelize, modelName: 'Category', tableName: "categories"});

    Category.associate = function (models) {
        Category.hasMany(models.Vocabulary, {as: "Vocabularies", foreignKey: "category_id"});
    }


    return Category
}