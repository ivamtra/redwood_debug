//TODO: isHidden
export const schema = gql`
  type Answer {
    id: Int!
    title: String!
    justification: String!
    user: User!
    userId: Int!
    createdAt: DateTime!
    question: Question!
    questionId: Int!
    rating: Int!
    isHidden: Boolean!
    UserLikesAnswer: [UserLikesAnswer]!
    AnswerComment: [AnswerComment]!
    translations: [Translation]!
    Issue: [Issue]!
  }

  type Query {
    answers(questionId: Int!): [Answer!]! @skipAuth
    answer(id: Int!): Answer @skipAuth
  }

  input CreateAnswerInput {
    title: String!
    justification: String!
    userId: Int!
    questionId: Int!
    rating: Int!
    isHidden: Boolean
  }

  input UpdateAnswerInput {
    title: String
    justification: String
    userId: Int
    questionId: Int
    rating: Int
    isHidden: Boolean
  }

  type Mutation {
    createAnswer(input: CreateAnswerInput!): Answer! @requireAuth
    updateAnswer(id: Int!, input: UpdateAnswerInput!): Answer! @requireAuth
    deleteAnswer(id: Int!): Answer! @requireAuth
  }
`
