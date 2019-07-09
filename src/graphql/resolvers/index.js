const {mergeResolvers} = require('merge-graphql-schemas');

const categoryResolver = require('./categoryResolver')
const vocabularyResolver = require('./vocabularyResolver')
const userResolver = require('./userResolver')
const resolvers = [
    userResolver,
    categoryResolver,
    vocabularyResolver,
];

module.exports = mergeResolvers(resolvers, {all: true});