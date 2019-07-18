const express = require('express');
const apolloServer = require('./graphql/apolloServer')
const authMiddleware = require('./modules/user/middleware/authMiddleware')

var app = express();


//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//AUTH
app.use(authMiddleware)

//STATIC IMG
app.use('/img/avatar',express.static( __dirname + '/../public/img/avatar'));

//APOLLO GRAPHQL
apolloServer.applyMiddleware({app});

app.listen({port: 4000}, () =>
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
);