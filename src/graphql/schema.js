const typeDefs = require('./types')
const resolvers = require('./resolvers')
const db = require('./../orm/models')
const {ApolloServer} = require(`apollo-server-express`)


const schema = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({req}) => {
        return {db: db, user: req.user}
    },
    playground: {
        endpoint: `/graphql`,
        settings: {
            'editor.theme': 'light'
        }
    }
});

module.exports = schema