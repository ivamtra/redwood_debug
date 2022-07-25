export const schema = gql`
  type Notification {
    id: Int!
    commentId: Int
    questionId: Int
    answerId: Int
    user: User!
    userId: Int!
    body: String!
    createdAt: DateTime!
    seen: Boolean!
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
    seen: Boolean!
  }

  input UpdateNotificationInput {
    commentId: Int
    questionId: Int
    answerId: Int
    userId: Int
    body: String
    seen: Boolean
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
