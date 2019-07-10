const express = require('express');
const apolloServer = require('./graphql/apolloServer')
const authMiddleware = require('./modules/user/middleware/authMiddleware')

var app = express();

app.use(authMiddleware)

apolloServer.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
);