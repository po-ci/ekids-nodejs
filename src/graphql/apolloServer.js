const typeDefs = require('./types')
const resolvers = require('./resolvers')
const db = require('../db')
const {ApolloServer} = require(`apollo-server-express`)


const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({req}) => {
        return {db: db, user: req.user}
    },
    introspection: true,
    playground: {
        endpoint: `/graphql`,
        settings: {
            'editor.theme': 'light'
        }
    }
});

module.exports = apolloServer