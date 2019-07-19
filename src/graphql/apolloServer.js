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
    formatError: (errors) => {
        const { extensions, message } = errors;


        if(extensions.exception.inputError){
            return {
                code: extensions.code,
                message: message,
                inputErrors: extensions.exception.inputError
            }
        }

        return {
            code: extensions.code,
            message: message
        }
    },
    introspection: true,
    debug: true,
    playground: {
        endpoint: `/graphql`,
        settings: {
            'editor.theme': 'light'
        }
    }
});

module.exports = apolloServer