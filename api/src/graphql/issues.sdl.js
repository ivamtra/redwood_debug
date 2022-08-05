export const schema = gql`
  type Issue {
    id: Int!
    question: Question!
    answer: Answer!
    answerComment: AnswerComment!
    user: User!
    createdAt: DateTime!
    description: String!
    questionId: Int!
    answerId: Int!
    answerCommentId: Int!
    userId: Int!
  }

  type Query {
    issues: [Issue!]! @requireAuth
    issue(id: Int!): Issue @requireAuth
  }

  input CreateIssueInput {
    description: String!
    questionId: Int!
    answerId: Int!
    answerCommentId: Int!
    userId: Int!
  }

  input UpdateIssueInput {
    description: String
    questionId: Int
    answerId: Int
    answerCommentId: Int
    userId: Int
  }

  type Mutation {
    createIssue(input: CreateIssueInput!): Issue! @requireAuth
    updateIssue(id: Int!, input: UpdateIssueInput!): Issue! @requireAuth
    deleteIssue(id: Int!): Issue! @requireAuth
  }
`
