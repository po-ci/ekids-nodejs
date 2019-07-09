const db = require('../models')

db.Category.sync({force: false}).then(()=>{
    db.Vocabulary.sync({force: false})
})

db.User.sync({force: true})