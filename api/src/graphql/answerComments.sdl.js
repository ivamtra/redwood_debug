export const schema = gql`
  type AnswerComment {
    id: Int!
    body: String!
    user: User!
    userId: Int!
    parentId: Int
    answer: Answer!
    answerId: Int!
    createdAt: DateTime!
    Issue: [Issue]!
    UserLikesComment: [UserLikesComment]!
    level: Int!
  }

  type Query {
    # answerComments: [AnswerComment!]! @skipAuth
    answerComment(id: Int!): AnswerComment @skipAuth
    answerComments(answerId: Int!): [AnswerComment!]! @skipAuth
    answerCommentsByParentId(parentId: Int): [AnswerComment!]! @skipAuth
    answerCommentsByAnswerId(answerId: Int!): [AnswerComment!]! @skipAuth
  }

  input CreateAnswerCommentInput {
    body: String!
    userId: Int!
    parentId: Int
    answerId: Int!
  }

  input UpdateAnswerCommentInput {
    body: String
    userId: Int
    parentId: Int
    answerId: Int
  }

  type Mutation {
    createAnswerComment(input: CreateAnswerCommentInput!): AnswerComment!
      @requireAuth
    updateAnswerComment(
      id: Int!
      input: UpdateAnswerCommentInput!
    ): AnswerComment! @requireAuth
    deleteAnswerComment(id: Int!): AnswerComment! @requireAuth
  }
`
