export const schema = gql`
  type TestNotification {
    id: Int!
    commentId: Int
    questionId: Int
    answerId: Int
    body: String!
    createdAt: DateTime!
    seen: Boolean!
    userId: Int!
    user: User!
    comment: AnswerComment
    question: Question
    answer: Answer
  }

  type Query {
    testNotifications: [TestNotification!]! @skipAuth
    testNotification(id: Int!): TestNotification @skipAuth
  }

  input CreateTestNotificationInput {
    commentId: Int
    questionId: Int
    answerId: Int
    body: String!
    seen: Boolean!
    userId: Int!
  }

  input UpdateTestNotificationInput {
    commentId: Int
    questionId: Int
    answerId: Int
    body: String
    seen: Boolean
    userId: Int
  }

  type Mutation {
    createTestNotification(
      input: CreateTestNotificationInput!
    ): TestNotification! @skipAuth
    updateTestNotification(
      id: Int!
      input: UpdateTestNotificationInput!
    ): TestNotification! @skipAuth
    deleteTestNotification(id: Int!): TestNotification! @skipAuth
  }
`
