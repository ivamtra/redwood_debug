//! Að gefa spurningu rating update-ar question
//! þannig allir sem eru loggaðir inn hafa aðgang að update api

export const schema = gql`
  type Question {
    id: Int!
    title: String!
    language: String!
    definition: String!
    other_info: String
    user: User!
    userId: Int!
    createdAt: DateTime!
    rating: Int!
    Sentence: [Sentence]!
    Answer: [Answer]!
    UserLikesQuestion: [UserLikesQuestion]!
    Issue: [Issue]!
    QuestionIsInCategory: [QuestionIsInCategory]!
  }

  type Query {
    questions: [Question!]! @skipAuth
    question(id: Int!): Question @skipAuth
  }

  input CreateQuestionInput {
    title: String!
    language: String!
    definition: String!
    other_info: String
    userId: Int!
    rating: Int!
  }

  input UpdateQuestionInput {
    title: String
    language: String
    definition: String
    other_info: String
    userId: Int
    rating: Int
  }

  type Mutation {
    createQuestion(input: CreateQuestionInput!): Question!
      @requireAuth(roles: "user")
    updateQuestion(id: Int!, input: UpdateQuestionInput!): Question!
      @requireAuth
    deleteQuestion(id: Int!): Question! @requireAuth
  }
`
