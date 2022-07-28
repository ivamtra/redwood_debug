//TODO: fá question til að virka
export const schema = gql`
  type AnswerComment {
    id: Int!
    body: String!
    user: User!
    userId: Int!
    parentId: Int
    answer: Answer!
    answerId: Int!
    question: Question!
    questionId: Int!
    createdAt: DateTime!
    level: Int!
    rating: Int!
    isHidden: Boolean!
    Issue: [Issue]!
    UserLikesComment: [UserLikesComment]!
  }

  type Query {
    # answerComments: [AnswerComment!]! @skipAuth
    answerComment(id: Int!): AnswerComment @skipAuth
    answerComments(answerId: Int!): [AnswerComment!]! @skipAuth
    answerCommentsByParentId(parentId: Int): [AnswerComment!]! @skipAuth
    answerCommentsByAnswerId(answerId: Int!): [AnswerComment!]! @skipAuth
    customAnswerComments(answerId: Int!, questionId: Int!): [AnswerComment!]!
      @skipAuth
  }

  input CreateAnswerCommentInput {
    body: String!
    userId: Int!
    parentId: Int
    questionId: Int!
    answerId: Int!
    level: Int!
    rating: Int!
    isHidden: Boolean
  }

  input UpdateAnswerCommentInput {
    body: String
    userId: Int
    parentId: Int
    answerId: Int
    level: Int
    rating: Int
    isHidden: Boolean
  }

  type Mutation {
    createAnswerComment(input: CreateAnswerCommentInput!): AnswerComment!
      @skipAuth
    updateAnswerComment(
      id: Int!
      input: UpdateAnswerCommentInput!
    ): AnswerComment! @requireAuth
    deleteAnswerComment(id: Int!): AnswerComment! @requireAuth
  }
`
