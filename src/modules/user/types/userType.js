const {gql} = require('apollo-server-express')

module.exports = gql`
    type User {
        id: ID!
        username: String!
        name: String!
        email: String!
        phone: String
        avatar: String
       
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

    type Mutation {
        auth(username: String!, password:String!): Token
        createUser(username: String!, password:String!, name:String!, email:String!, phone:String): User
        updateUser(id: ID!, username: String, name:String, email:String, phone:String): User
        deleteUser(id: ID!): Boolean!
        changePassword(id: ID!, password:String!): Boolean!
    }

`