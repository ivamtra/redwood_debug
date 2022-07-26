export const schema = gql`
  type Fart {
    id: Int!
    question: Question!
    answer: Answer!
    answerComment: AnswerComment!
    user: User!
    body: String!
    isSeen: Boolean!
    questionId: Int!
    answerId: Int!
    answerCommentId: Int!
    userId: Int!
  }

  type Query {
    farts: [Fart!]! @requireAuth
    fart(id: Int!): Fart @requireAuth
  }

  input CreateFartInput {
    body: String!
    isSeen: Boolean!
    questionId: Int!
    answerId: Int!
    answerCommentId: Int!
    userId: Int!
  }

  input UpdateFartInput {
    body: String
    isSeen: Boolean
    questionId: Int
    answerId: Int
    answerCommentId: Int
    userId: Int
  }

  type Mutation {
    createFart(input: CreateFartInput!): Fart! @requireAuth
    updateFart(id: Int!, input: UpdateFartInput!): Fart! @requireAuth
    deleteFart(id: Int!): Fart! @requireAuth
  }
`
