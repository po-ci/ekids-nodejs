const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const {Op, Sequelize} = require('sequelize')
const {UserInputError} = require('apollo-server-express');
const sequelizeValidationsAdapter = require('./../../../helpers/sequelize-validations-adapter')

module.exports = {
    Query: {
        users: (parent, args, {db}, info) => db.User.findAll(),
        user: (parent, args, {db}, info) => db.User.findById(id),
        me: async (parent, args, {db, user}, info) => {
            return db.User.findByPk(user.id)
        },
    },
    Mutation: {
        async auth(parent, {username, password}, {db}, info) {

            let user = await db.User.findOne({
                where: {
                    [Op.or]: [
                        {username: username}, {email: username}
                    ]

                }
            })

            if (!user) {
                throw new Error('No user with that username/email')
            }

            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    return jsonwebtoken.sign(
                        {id: user.id, username: user.username, email: user.email, phone: user.phone},
                        process.env.JWT_SECRET,
                        {expiresIn: '1d'}
                    )
                } else {
                    throw new Error('Incorrect password')
                }
            }


        },
        createUser: (parent, {username, password, name, email, phone}, {db}, info) => {


            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            return db.User.create({
                username: username,
                password: hash,
                name: name,
                email: email,
                phone: phone,
            }).catch(Sequelize.ValidationError, function (err) {

                let e =  sequelizeValidationsAdapter(err)
                throw new UserInputError('Form Arguments invalid', {
                   e
                });
            })
        },
        updateUser: (parent, {id, name, email, phone}, {db}, info) =>
            db.User.update({
                name: name,
                email: email,
                phone: phone,
            }, {
                where: {id: id}
            }),
        deleteUser: (parent, {id}, {db}, info) =>
            db.User.destroy({
                where: {
                    id: id
                }
            })
    }
};