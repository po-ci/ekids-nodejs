const jwtDecode = require('jwt-decode')

//Middleware sacado de https://www.youtube.com/watch?v=4_Bcw7BULC8&t=1014s
//Al parecer, no es necesario, dado que authMiddleware ya setea el usuario
const userMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        req.user = jwtDecode(authHeader)
    }
    next()
}

module.exports = userMiddleware