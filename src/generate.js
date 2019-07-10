const db = require('./db')

async function generate(){
    await db.User.sync({force: false})
    await db.Category.sync({force: false})
    await db.Vocabulary.sync({force: false})
}

generate()
