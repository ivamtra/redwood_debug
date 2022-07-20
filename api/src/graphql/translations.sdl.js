export const schema = gql`
  type Translation {
    id: Int!
    translation: String!
    answer: Answer!
    answerId: Int!
  }

  type Query {
    translations(answerId: Int!): [Translation!]! @skipAuth
    translation(id: Int!): Translation @skipAuth
  }

  input CreateTranslationInput {
    translation: String!
    answerId: Int!
  }

  input UpdateTranslationInput {
    translation: String
    answerId: Int
  }

  type Mutation {
    createTranslation(input: CreateTranslationInput!): Translation! @requireAuth
    updateTranslation(id: Int!, input: UpdateTranslationInput!): Translation!
      @requireAuth
    deleteTranslation(id: Int!): Translation! @requireAuth
  }
`
