const {gql} = require('apollo-server-express')

module.exports = gql`
    type Category {
        id: ID!
        name: String!
        description: String
        vocabularies: [Vocabulary!]!
    }

    type Query {
        categories: [Category!]!
        category(id: ID!): Category

    }

    type Mutation {
        createCategory(name: String!, description:String): Category!
        updateCategory(id: ID!, name: String!, description:String): Category!
        deleteCategory(id: ID!): Int!
    }
`