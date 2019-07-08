const db = require('../models')


db.Category.sync({force: true}).then(
    () => {

        db.sequelize.transaction(async t => {
            const cat1 = await db.Category.create({
                name: "Shapes",
                description: "sss",
            }, {transaction: t})

            const cat2 = await db.Category.create({
                name: "Weather",
                description: "asdasd",
            }, {transaction: t})

        })


    }
)



