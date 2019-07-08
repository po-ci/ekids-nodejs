const db = require('../models')


db.User.findAll().then(users => {
    console.log(users)
})


db.User.findAll({
    where: {
        firstName: "Cris"
    }
}).then(users => {
    console.log(users)
})