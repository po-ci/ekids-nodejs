const {gql} = require('apollo-server-express')

module.exports = gql`


    type User {
        id: ID!
        username: String!
        name: String!
        email: String!
        phone: String
        avatar: String
        avatarurl: String

    }

    type Token {
        token:String!
        user: User
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        me: User
    }

    type RecoverPasswordResponse{
        status: Boolean
        message: String
    }

    type ChangePasswordResponse{
        status: Boolean
        message: String
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
        url: String!
    }

    type Mutation {

        auth(username: String!, password:String!): Token

        createUser(username: String!, password:String!, name:String!, email:String!, phone:String): User
        updateUser(id: ID!, username: String, name:String, email:String, phone:String): User
        deleteUser(id: ID!): Boolean!

        recoveryPassword(email:String!):RecoverPasswordResponse!
        changePassword( password:String!, passwordVerify:String!): ChangePasswordResponse!

        avatarUpload(file: Upload!): File!
    }

`