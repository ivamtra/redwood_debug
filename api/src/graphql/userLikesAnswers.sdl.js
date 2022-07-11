export const schema = gql`
  type UserLikesAnswer {
    id: Int!
    user: User!
    userId: Int!
    action: Int!
    answer: Answer!
    answerId: Int!
    dateTime: DateTime!
  }

  type Query {
    userLikesAnswers: [UserLikesAnswer!]! @requireAuth
    userLikesAnswer(id: Int!): UserLikesAnswer @requireAuth
    customUserLikesAnswer(answerId: Int!, userId: Int!): [UserLikesAnswer!]!
      @skipAuth
  }

  input CreateUserLikesAnswerInput {
    userId: Int!
    action: Int!
    answerId: Int!
    dateTime: DateTime!
  }

  input UpdateUserLikesAnswerInput {
    userId: Int
    action: Int
    answerId: Int
    dateTime: DateTime
  }

  type Mutation {
    createUserLikesAnswer(input: CreateUserLikesAnswerInput!): UserLikesAnswer!
      @requireAuth
    updateUserLikesAnswer(
      id: Int!
      input: UpdateUserLikesAnswerInput!
    ): UserLikesAnswer! @requireAuth
    deleteUserLikesAnswer(id: Int!): UserLikesAnswer! @requireAuth
  }
`
