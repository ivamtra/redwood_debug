export const schema = gql`
  type Notification {
    id: Int!
    question: Question!
    answer: Answer!
    answerComment: AnswerComment!
    user: User!
    body: String!
    isSeen: Boolean!
    questionId: Int!
    answerId: Int!
    answerCommentId: Int!
    userId: Int!
    createdAt: DateTime!
  }

  type Query {
    notifications(userId: Int!): [Notification!]! @skipAuth
    notification(id: Int!): Notification @skipAuth
  }

  input CreateNotificationInput {
    body: String!
    isSeen: Boolean!
    questionId: Int!
    answerId: Int!
    answerCommentId: Int!
    userId: Int!
  }

  input UpdateNotificationInput {
    body: String
    isSeen: Boolean
    questionId: Int
    answerId: Int
    answerCommentId: Int
    userId: Int
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
