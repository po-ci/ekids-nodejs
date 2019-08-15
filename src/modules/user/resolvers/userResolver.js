const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const {Op, Sequelize} = require('sequelize')
const {UserInputError} = require('apollo-server-express');
const {errorList, errorMessage} = require('./../../../helpers/sequelize-validations-adapter')
const fs = require('fs')
const path = require('path')
const randomstring = require('./../../../helpers/randomstring')
const userEmailManager = require('./../service/UserEmailManager')

module.exports = {
    Query: {
        users: (parent, args, {db}, info) => db.User.findAll({
            include: [{
                model: db.Role,
                as: 'role',
                required: false,
                attributes: ['id', 'name'],
            }]
        }),
        user: (parent, {id}, {db}, info) => db.User.findByPk(id, {
            include: [{
                model: db.Role,
                as: 'role',
                required: false,
                attributes: ['id', 'name'],
            }]
        }),
        me: async (parent, args, {db, user}, info) => {
            return db.User.findByPk(user.id)
        },
        roles: (parent, args, {db}, info) => db.Role.findAll({
            include: [{
                model: db.Permission,
                as: 'permissions',
                required: false,
                attributes: ['id', 'name'],
            }]
        }),
        role: (parent, {id}, {db}, info) => db.Role.findByPk(id, {
            include: [{
                model: db.Permission,
                as: 'permissions',
                required: false,
                attributes: ['id', 'name'],
            }]
        }),
        permissions: (parent, args, {db}, info) => db.Permission.findAll(),
        permission: (parent, args, {db}, info) => db.Permission.findByPk(id),
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
                    let token = jsonwebtoken.sign(
                        {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            phone: user.phone,
                            avatarurl: user.avatarurl
                        },
                        process.env.JWT_SECRET,
                        {expiresIn: '1d'}
                    )
                    return {token: token, user: user}
                } else {
                    throw new Error('Incorrect password')
                }
            }


        },

        createUser: (parent, {username, password, name, email, phone, role, active}, {db}, info) => {

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            return db.User.create({
                username: username,
                password: hash,
                name: name,
                email: email,
                phone: phone,
                active: active,
                role_id: role
            }).then(u => {
                return {
                    user: db.User.findByPk(u.id, {
                        include: [{
                            model: db.Role,
                            as: 'role',
                            required: false,
                            attributes: ['id', 'name'],
                        }]
                    })
                }
            }).catch(Sequelize.ValidationError, function (err) {
                throw new UserInputError(errorMessage(err), errorList(err));
            })


        },

        registerUser: (parent, {username, password, name, email, phone}, {db}, info) => {

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            let active = false;
            let roleId = 1;

            return db.User.create({
                username: username,
                password: hash,
                name: name,
                email: email,
                phone: phone,
                active: active,
                role_id: roleId
            }).then(u => {
                userEmailManager.activation(u.email)
                return {
                   status : true, id: u.id, email: u.email
                }
            }).catch(Sequelize.ValidationError, function (err) {
                throw new UserInputError(errorMessage(err), errorList(err));
            })


        },

        updateUser: (parent, {id, name, username, email, phone, role, active}, {db}, info) => {
            return db.User.update(
                {
                    name: name,
                    username: username,
                    email: email,
                    phone: phone,
                    role_id: role,
                    active: active
                },
                {
                    where: {id: id}
                }
            ).then(() => {
                    return {
                        user: db.User.findByPk(id, {
                            include: [{
                                model: db.Role,
                                as: 'role',
                                required: false,
                                attributes: ['id', 'name'],
                            }]
                        })
                    }
                }
            ).catch(Sequelize.ValidationError, function (err) {
                    throw new UserInputError(errorMessage(err), errorList(err));
                }
            )
        },

        deleteUser: (parent, {id}, {db}, info) =>
            db.User.destroy({
                where: {
                    id: id
                }
            }),

        recoveryPassword: (parent, {email}, {db}) => {
            //Todo send email
            return {status: true, message: "Se envio un mail con la nueva contraseña"}
        },

        avatarUpload: async (parent, {file}, {db, user}) => {
            //@TODO validate image size, extension
            const {filename, mimetype, encoding, createReadStream} = await file;


            const parseFileName = path.parse(filename);
            const finalFileName = user.username + parseFileName.ext

            const rs = createReadStream()
            const dst = path.join("public", "img", "avatar", finalFileName)
            var wstream = fs.createWriteStream(dst);
            rs.pipe(wstream);

            const rand = randomstring(3)
            const url = process.env.HOST + "/img/avatar/" + finalFileName + "?" + rand


            db.User.update({
                avatar: finalFileName,
                avatarurl: url
            }, {
                where: {id: user.id}
            })


            return {filename, mimetype, encoding, url};
        },

        changePassword: (parent, {password, passwordVerify}, {db, user}, info) => {

            if (password == passwordVerify) {

                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);
                let result = db.User.update({
                    password: hash,
                }, {
                    where: {id: user.id}
                })

                if (result) {
                    return {status: true, message: "Password modificada con exito"}
                } else {
                    return {status: false, message: "Falla al intentar modificar password"}
                }

            } else {
                return {status: false, message: "Las password no concuerdan"}
            }
        }
    }
}