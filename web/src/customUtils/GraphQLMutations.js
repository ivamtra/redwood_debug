// ----------- GRAPHQL CRUD --------------------------

// ----------- CREATE ---------------------------

export const CREATE_QUESTION_UPVOTE = gql`
  mutation CreateQuestionUpvote($input: CreateUserLikesQuestionInput!) {
    createUserLikesQuestion(input: $input) {
      id
    }
  }
`

export const CREATE_ANSWER_UPVOTE = gql`
  mutation CreateAnswerUpvote($input: CreateUserLikesAnswerInput!) {
    createUserLikesAnswer(input: $input) {
      id
    }
  }
`

export const CREATE_COMMENT_UPVOTE = gql`
  mutation CreateCommentUpvote($input: CreateUserLikesCommentInput!) {
    createUserLikesComment(input: $input) {
      id
    }
  }
`
// ---------------------------------------------

// ----------- READ ----------------------------

// ----------- Componenta Query ----------------------------

export const QUESTION_QUERY = gql`
  query FindQuestionQuery($id: Int!) {
    question: question(id: $id) {
      id
      rating
    }
  }
`

export const ANSWER_QUERY = gql`
  query FindAnswerQuery($id: Int!) {
    answer: answer(id: $id) {
      id
      rating
    }
  }
`

export const COMMENT_QUERY = gql`
  query FindAnswerCommentQuery($id: Int!) {
    answerComment: answerComment(id: $id) {
      id
      rating
    }
  }
`

// ----------- UserLikesX Töflur Query GraphQL --------------------------

export const USER_LIKES_QUESTION_QUERY = gql`
  query CustomUserLikesQuestion($userId: Int!, $questionId: Int!) {
    customUserLikesQuestion: customUserLikesQuestion(
      userId: $userId
      questionId: $questionId
    ) {
      id
      action
      userId
      questionId
    }
  }
`

export const USER_LIKES_ANSWER_QUERY = gql`
  query CustomUserLikesAnswer($userId: Int!, $answerId: Int!) {
    customUserLikesAnswer: customUserLikesAnswer(
      userId: $userId
      answerId: $answerId
    ) {
      id
      action
      userId
      answerId
    }
  }
`

export const USER_LIKES_COMMENT_QUERY = gql`
  query CustomUserLikesComment($userId: Int!, $commentId: Int!) {
    customUserLikesComment: customUserLikesComment(
      userId: $userId
      commentId: $commentId
    ) {
      id
      action
      userId
      commentId
    }
  }
`
// ---------------------------------------------

// ----------- UPDATE --------------------------

// ----------- Hækka rating á question --------------------------

export const UPDATE_QUESTION_RATING = gql`
  mutation UpdateQuestionRating($id: Int!, $input: UpdateQuestionInput!) {
    updateQuestion(id: $id, input: $input) {
      id
    }
  }
`

export const UPDATE_ANSWER_RATING = gql`
  mutation UpdateAnswerRating($id: Int!, $input: UpdateAnswerInput!) {
    updateAnswer(id: $id, input: $input) {
      id
    }
  }
`

export const UPDATE_COMMENT_RATING = gql`
  mutation UpdateCommentRating($id: Int!, $input: UpdateAnswerCommentInput!) {
    updateAnswerComment(id: $id, input: $input) {
      id
    }
  }
`

// ----------- Breytingar í UserLikesX töflum ----------

export const UPDATE_USER_LIKES_QUESTION = gql`
  mutation UpdateUserLikesQuestion(
    $id: Int!
    $input: UpdateUserLikesQuestionInput!
  ) {
    updateUserLikesQuestion(id: $id, input: $input) {
      id
    }
  }
`

export const UPDATE_USER_LIKES_ANSWER = gql`
  mutation UpdateUserLikesAnswer(
    $id: Int!
    $input: UpdateUserLikesAnswerInput!
  ) {
    updateUserLikesAnswer(id: $id, input: $input) {
      id
    }
  }
`

export const UPDATE_USER_LIKES_COMMENT = gql`
  mutation UpdateUserLikesComment(
    $id: Int!
    $input: UpdateUserLikesCommentInput!
  ) {
    updateUserLikesComment(id: $id, input: $input) {
      id
    }
  }
`

export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification($id: Int!, $input: UpdateNotificationInput!) {
    updateNotification(id: $id, input: $input) {
      id
    }
  }
`

export const GraphQLMutations = {
  CREATE_QUESTION_UPVOTE: CREATE_QUESTION_UPVOTE,
  CREATE_ANSWER_UPVOTE: CREATE_ANSWER_UPVOTE,
  CREATE_COMMENT_UPVOTE: CREATE_COMMENT_UPVOTE,
  QUESTION_QUERY: QUESTION_QUERY,
  ANSWER_QUERY: ANSWER_QUERY,
  COMMENT_QUERY: COMMENT_QUERY,
  USER_LIKES_QUESTION_QUERY: USER_LIKES_QUESTION_QUERY,
  USER_LIKES_ANSWER_QUERY: USER_LIKES_ANSWER_QUERY,
  USER_LIKES_COMMENT_QUERY: USER_LIKES_COMMENT_QUERY,
  UPDATE_QUESTION_RATING: UPDATE_QUESTION_RATING,
  UPDATE_ANSWER_RATING: UPDATE_ANSWER_RATING,
  UPDATE_COMMENT_RATING: UPDATE_COMMENT_RATING,
  UPDATE_USER_LIKES_QUESTION: UPDATE_USER_LIKES_QUESTION,
  UPDATE_USER_LIKES_ANSWER: UPDATE_USER_LIKES_ANSWER,
  UPDATE_USER_LIKES_COMMENT: UPDATE_USER_LIKES_COMMENT,
}

console.log(ANSWER_QUERY)
console.log(GraphQLMutations.ANSWER_QUERY)
// -----------------------------------------------------
