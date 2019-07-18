const db = require('./db')

async function generate(){
    await db.sync({alter:true})
}

async function generateByEntity(){

    await db.Role.sync({force: false, alter:true})
    await db.Permission.sync({force: false, alter:true})
    await db.RolesPermissions.sync({force: false, alter:true})
    await db.User.sync({force: false, alter:true})

    await db.Category.sync({force: false, alter:true})
    await db.Vocabulary.sync({force: false, alter:true})
}

generateByEntity()
