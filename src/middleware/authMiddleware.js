const jwt = require('express-jwt')
require('dotenv').config()



// auth middleware
const authMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
})

module.exports = authMiddleware