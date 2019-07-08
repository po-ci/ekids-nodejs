const db = require('../models')


db.Vocabulary.sync({force: true}).then(() => {

        db.sequelize.transaction(async t => {
            const vo1 = await db.Vocabulary.create({
                en: "square",
                es: "cuadrado",
            }, {transaction: t})


        })


    }
)





