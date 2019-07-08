const express = require('express');

const schema = require('../graphql/schema')


var app = express();
schema.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${schema.graphqlPath}`)
);