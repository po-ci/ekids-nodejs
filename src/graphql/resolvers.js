const {mergeResolvers} = require('merge-graphql-schemas');

//LEARN Resolvers
const categoryResolver = require('../modules/learn/resolvers/categoryResolver')
const vocabularyResolver = require('../modules/learn/resolvers/vocabularyResolver')

//User Resolvers
const userResolver = require('../modules/user/resolvers/userResolver')

const resolvers = [
    userResolver,
    categoryResolver,
    vocabularyResolver,
];

module.exports = mergeResolvers(resolvers, {all: true});