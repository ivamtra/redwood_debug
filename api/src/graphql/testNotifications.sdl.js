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
  }

  type Query {
    testNotifications: [TestNotification!]! @requireAuth
    testNotification(id: Int!): TestNotification @requireAuth
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
    ): TestNotification! @requireAuth
    updateTestNotification(
      id: Int!
      input: UpdateTestNotificationInput!
    ): TestNotification! @requireAuth
    deleteTestNotification(id: Int!): TestNotification! @requireAuth
  }
`
