const express = require('express');
const schema = require('../graphql/schema')
const authMiddleware = require('./../middleware/authMiddleware')

var app = express();

app.use(authMiddleware)

schema.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${schema.graphqlPath}`)
);