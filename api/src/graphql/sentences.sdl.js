export const schema = gql`
  type Sentence {
    id: Int!
    sentence: String!
    question: Question!
    questionId: Int!
  }

  type Query {
    sentences(questionId: Int!): [Sentence!]! @skipAuth
    sentence(id: Int!): Sentence @skipAuth
    getSentences(questionId: Int!): [Sentence!]! @skipAuth
  }

  input CreateSentenceInput {
    sentence: String!
    questionId: Int!
  }

  input UpdateSentenceInput {
    sentence: String
    questionId: Int
  }

  type Mutation {
    createSentence(input: CreateSentenceInput!): Sentence! @requireAuth
    updateSentence(id: Int!, input: UpdateSentenceInput!): Sentence!
      @requireAuth
    deleteSentence(id: Int!): Sentence! @requireAuth
  }
`
