const {mergeTypes} = require('merge-graphql-schemas');

const categoryType = require('./categoryType')
const vocabularyType = require('./vocabularyType')

const types = [
    categoryType,
    vocabularyType,
];

module.exports = mergeTypes(types, {all: true});