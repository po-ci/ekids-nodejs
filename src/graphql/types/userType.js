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

    type Query {
        users: [User!]!
        user(id: ID!): User
        me: User
    }

    type Mutation {
        auth(username: String!, password:String!): String
        createUser(username: String!, password:String!, name:String!, email:String!, phone:String): User!
        updateUser(id: ID!, username: String, name:String, email:String, phone:String): User!
        deleteUser(id: ID!): User!
    }

`