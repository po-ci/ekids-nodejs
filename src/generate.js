const db = require('./db')

async function generate(){
    await db.User.sync({force: false, alter:true})
    await db.Category.sync({force: false, alter:true})
    await db.Vocabulary.sync({force: false, alter:true})
}

generate()
