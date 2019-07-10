const db = require('../src/db')

db.User.sync({force: true}).then(
    () => {

        db.sequelize.transaction(async t => {
            const user1 = await db.User.create({
                firstName: "Cintia",
                lastName: "Ferreyra",
                phone: "1133126578"
            }, {transaction: t})

            const user2 = await db.User.create({
                firstName: "Cristian",
                lastName: "Incarnato",
                phone: "1133126919"
            }, {transaction: t})

        })


    }
);

