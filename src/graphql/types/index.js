const {mergeTypes} = require('merge-graphql-schemas');

const categoryType = require('./categoryType')
const vocabularyType = require('./vocabularyType')
const userType = require('./userType')

const types = [
    userType,
    categoryType,
    vocabularyType,
];

module.exports = mergeTypes(types, {all: true});