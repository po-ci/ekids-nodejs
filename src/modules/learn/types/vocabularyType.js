const {gql} = require('apollo-server-express')

module.exports = gql`
    type Vocabulary {
        id: ID!
        en: String!
        es: String!
        enSnd: String!
        esSnd: String!
        img: String!
        category: Category!
    }

    type Query {
        vocabularies: [Vocabulary!]!
        vocabulary(id: ID!): Vocabulary
    }

    type Mutation {
        createVocabulary(en: String!, es:String!): Vocabulary!
        updateVocabulary(id: ID!, en: String!, es:String): Vocabulary!
        deleteVocabulary(id: ID!): Int!
    }
    
`