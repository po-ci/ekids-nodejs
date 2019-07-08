const db = require('../models')

db.Category.sync({force: true}).then(()=>{
    db.Vocabulary.sync({force: true})
})