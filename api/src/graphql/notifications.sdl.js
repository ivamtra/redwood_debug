export const schema = gql`
  type Notification {
    id: Int!
    commentId: Int
    questionId: Int
    answerId: Int
    userId: Int!
    user: User!
    body: String!
    createdAt: DateTime!
  }

  type Query {
    notifications: [Notification!]! @requireAuth
    notification(id: Int!): Notification @requireAuth
  }

  input CreateNotificationInput {
    commentId: Int
    questionId: Int
    answerId: Int
    userId: Int!
    body: String!
  }

  input UpdateNotificationInput {
    commentId: Int
    questionId: Int
    answerId: Int
    userId: Int
    body: String
  }

  type Mutation {
    createNotification(input: CreateNotificationInput!): Notification!
      @requireAuth
    updateNotification(
      id: Int!
      input: UpdateNotificationInput!
    ): Notification! @requireAuth
    deleteNotification(id: Int!): Notification! @requireAuth
  }
`
