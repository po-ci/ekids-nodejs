const {Sequelize} = require('sequelize')

const NEW_LINE = "\n"
module.exports.errorMessage = (err) => {

    var message = ""
    err.errors.forEach(error => {
        message = message + error.message + NEW_LINE;
    })

    return message
}

module.exports.errorList = (err) => {

    //console.log(err)

    var errors = []
    err.errors.forEach(error => {
        let i = errors.find(i => i.field == error.path)
        if (i) {
            i.msgs.push(error.message)
        } else {
            errors.push({field: error.path, msgs: [error.message]})
        }
    })
    return {inputError: errors}
}