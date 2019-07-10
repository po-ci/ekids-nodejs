const {Sequelize} = require('sequelize')


module.exports = (err) => {

    console.log(err)

    var errors = []
    err.errors.forEach(error => {
        let i = errors.find(i => i.field == error.path)
        if (i) {
            i.msgs.push(error.message)
        } else {
            errors.push({field: error.path, msgs: [error.message]})
        }
    })
    return errors
}