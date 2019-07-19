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
        role: Role
        active: Boolean!
    }

    type Role {
        id: ID!
        name: String!
        permissions: [Permission]
    }

    type Permission {
        id: ID!
        name: String!
    }


    type Token {
        token:String!
        user: User
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        me: User
        roles: [Role]
        role(id:ID!): Role
        permissions: [Permission]
        permission(id:ID!): Permission
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
    
    type CreateUserResponse{
        user: User
    }

    type UpdateUserResponse{
        user: User
    }

    type Mutation {

        auth(username: String!, password:String!): Token

        createUser(username: String, password:String, name:String, email:String, phone:String, role: Int, active: Boolean): CreateUserResponse
        updateUser(id: ID!, username: String, name:String, email:String, phone:String, role: Int, active: Boolean): UpdateUserResponse
        deleteUser(id: ID!): Boolean!

        recoveryPassword(email:String!):RecoverPasswordResponse!
        changePassword( password:String!, passwordVerify:String!): ChangePasswordResponse!

        avatarUpload(file: Upload!): File!
    }

`