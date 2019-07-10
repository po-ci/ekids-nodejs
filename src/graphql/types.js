const {mergeTypes} = require('merge-graphql-schemas');

//LEARN TypeDefs
const categoryType = require('../modules/learn/types/categoryType')
const vocabularyType = require('../modules/learn/types/vocabularyType')

//USER TypeDefs
const userType = require('../modules/user/types/userType')

const types = [
    userType,
    categoryType,
    vocabularyType,
];

module.exports = mergeTypes(types, {all: true});