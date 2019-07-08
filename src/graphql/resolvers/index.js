const {mergeResolvers} = require('merge-graphql-schemas');

const categoryResolver = require('./categoryResolver')
const vocabularyResolver = require('./vocabularyResolver')

const resolvers = [
    categoryResolver,
    vocabularyResolver,
];

module.exports = mergeResolvers(resolvers, {all: true});