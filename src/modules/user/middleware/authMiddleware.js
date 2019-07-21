const jwt = require('express-jwt')
require('dotenv').config()



module.exports.handleAuthError = function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        res.status(err.status).send({message:err.message});
        return;
    }
    next();
}

// auth middleware
module.exports.jwtAuth = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
})
