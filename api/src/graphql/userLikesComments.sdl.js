export const schema = gql`
  type UserLikesComment {
    id: Int!
    user: User!
    action: Int!
    answerComment: AnswerComment!
    dateTime: DateTime!
    userId: Int!
    commentId: Int!
  }

  type Query {
    userLikesComments: [UserLikesComment!]! @requireAuth
    userLikesComment(id: Int!): UserLikesComment @requireAuth
  }

  input CreateUserLikesCommentInput {
    action: Int!
    dateTime: DateTime!
    userId: Int!
    commentId: Int!
  }

  input UpdateUserLikesCommentInput {
    action: Int
    dateTime: DateTime
    userId: Int
    commentId: Int
  }

  type Mutation {
    createUserLikesComment(
      input: CreateUserLikesCommentInput!
    ): UserLikesComment! @requireAuth
    updateUserLikesComment(
      id: Int!
      input: UpdateUserLikesCommentInput!
    ): UserLikesComment! @requireAuth
    deleteUserLikesComment(id: Int!): UserLikesComment! @requireAuth
  }
`
