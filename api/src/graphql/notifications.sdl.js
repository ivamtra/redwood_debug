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
    seen: Boolean!
  }

  type Query {
    notifications: [Notification!]! @skipAuth
    notification(id: Int!): Notification @skipAuth
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
    createNotification(input: CreateNotificationInput!): Notification! @skipAuth
    updateNotification(
      id: Int!
      input: UpdateNotificationInput!
    ): Notification! @skipAuth
    deleteNotification(id: Int!): Notification! @skipAuth
  }
`
