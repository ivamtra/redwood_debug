//! Að gefa spurningu rating update-ar question
//! þannig allir sem eru loggaðir inn hafa aðgang að update api

const CREATE_QUESTION_ROLES = ['admin', 'moderator', 'user']

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
    isHidden: Boolean!
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
    isHidden: Boolean
  }

  input UpdateQuestionInput {
    title: String
    language: String
    definition: String
    other_info: String
    userId: Int
    rating: Int
    isHidden: Boolean
  }

  type Mutation {
    createQuestion(input: CreateQuestionInput!): Question! @requireAuth
    updateQuestion(id: Int!, input: UpdateQuestionInput!): Question!
      @requireAuth
    deleteQuestion(id: Int!): Question! @requireAuth
  }
`
