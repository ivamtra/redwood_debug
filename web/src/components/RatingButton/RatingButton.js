/* eslint-disable no-case-declarations */
//TODO: Refactora
//TODO: ENUM fyrir tegund af component?
//TODO: CSS til að merkja hvort að takkinn hafi verið smelltur
import { useCallback, useEffect, useState } from 'react' //

import { useAuth } from '@redwoodjs/auth'
import { Submit, Form } from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useForceUpdate } from 'src/customhooks/useForceUpdate'

import { QUERY as refetchAnswerQuery } from '../AnswerCell'
import { QUERY as refetchCommentQuery } from '../AnswerCommentCell'
import { QUERY as refetchQuestionQuery } from '../QuestionCell'

// ----------- GRAPHQL CRUD --------------------------

// ----------- CREATE ---------------------------

const CREATE_QUESTION_UPVOTE = gql`
  mutation CreateQuestionUpvote($input: CreateUserLikesQuestionInput!) {
    createUserLikesQuestion(input: $input) {
      id
    }
  }
`

const CREATE_ANSWER_UPVOTE = gql`
  mutation CreateAnswerUpvote($input: CreateUserLikesAnswerInput!) {
    createUserLikesAnswer(input: $input) {
      id
    }
  }
`

const CREATE_COMMENT_UPVOTE = gql`
  mutation CreateCommentUpvote($input: CreateUserLikesCommentInput!) {
    createUserLikesComment(input: $input) {
      id
    }
  }
`
// ---------------------------------------------

// ----------- READ ----------------------------

// ----------- Componenta Query ----------------------------

const QUESTION_QUERY = gql`
  query FindQuestionQuery($id: Int!) {
    question: question(id: $id) {
      id
      rating
    }
  }
`

const ANSWER_QUERY = gql`
  query FindAnswerQuery($id: Int!) {
    answer: answer(id: $id) {
      id
      rating
    }
  }
`

const COMMENT_QUERY = gql`
  query FindAnswerCommentQuery($id: Int!) {
    answerComment: answerComment(id: $id) {
      id
      rating
    }
  }
`

// ----------- UserLikesX Töflur Query GraphQL --------------------------

const USER_LIKES_QUESTION_QUERY = gql`
  query CustomUserLikesQuestion($userId: Int!, $questionId: Int!) {
    customUserLikesQuestion: customUserLikesQuestion(
      userId: $userId
      questionId: $questionId
    ) {
      id
      action
    }
  }
`

const USER_LIKES_ANSWER_QUERY = gql`
  query CustomUserLikesAnswer($userId: Int!, $answerId: Int!) {
    customUserLikesAnswer: customUserLikesAnswer(
      userId: $userId
      answerId: $answerId
    ) {
      id
      action
    }
  }
`

const USER_LIKES_COMMENT_QUERY = gql`
  query CustomUserLikesComment($userId: Int!, $commentId: Int!) {
    customUserLikesComment: customUserLikesComment(
      userId: $userId
      commentId: $commentId
    ) {
      id
      action
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

const UPDATE_USER_LIKES_QUESTION = gql`
  mutation UpdateUserLikesQuestion(
    $id: Int!
    $input: UpdateUserLikesQuestionInput!
  ) {
    updateUserLikesQuestion(id: $id, input: $input) {
      id
    }
  }
`

const UPDATE_USER_LIKES_ANSWER = gql`
  mutation UpdateUserLikesAnswer(
    $id: Int!
    $input: UpdateUserLikesAnswerInput!
  ) {
    updateUserLikesAnswer(id: $id, input: $input) {
      id
    }
  }
`

const UPDATE_USER_LIKES_COMMENT = gql`
  mutation UpdateUserLikesComment(
    $id: Int!
    $input: UpdateUserLikesCommentInput!
  ) {
    updateUserLikesComment(id: $id, input: $input) {
      id
    }
  }
`

// -----------------------------------------------------

// ----------- UpdateRating fall ----------------------------------

// (int, int) => int
// Gefur töluna sem hækka/lækka á componentinn um
const calculateRatingDifference = (oldRating, newRating) => {
  if (oldRating === 0) {
    return newRating
  } else if (oldRating !== newRating) {
    return 2 * newRating
  } else {
    return -newRating
  }
}

// Talan sem fer í userLikesX
const newRating = (oldRating, newRating) => {
  if (oldRating === newRating) {
    return 0
  } else {
    return newRating
  }
}

const handleCatch = (workingData, rating) => {
  const ratingChange = calculateRatingDifference(workingData.action, rating)
  const newAction = newRating(workingData.action, rating)
  return [newAction, ratingChange]
}

// ------------------------------------------------------

// ------------ React Component ------------------------

const RatingButton = ({ type, id }) => {
  // ------------ OnCompleted ----------------------------

  const onCompleted = (type) => {
    if (rating === -1) {
      toast.success('downvoted ' + type)
    } else {
      toast.success('upvoted ' + type)
    }
  }

  // ----------------- Variables ---------------------
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [rating, setRating] = useState(0)
  let debugUserId

  // Laga tilfellið þegar user er ekki loggaður inn
  if (!isAuthenticated) {
    debugUserId = 0
  } else {
    debugUserId = currentUser.id
  }

  // --------- DATABASE ------------------------------

  // -------------------------------------------------

  // CREATE
  const [createQuestionUpvote] = useMutation(CREATE_QUESTION_UPVOTE, {
    refetchQueries: [
      {
        query: USER_LIKES_QUESTION_QUERY,
        variables: {
          userId: debugUserId,
          questionId: id,
        },
      },
    ],
  })
  const [createAnswerUpvote] = useMutation(CREATE_ANSWER_UPVOTE, {
    refetchQueries: [
      {
        query: USER_LIKES_ANSWER_QUERY,
        variables: {
          userId: debugUserId,
          answerId: id,
        },
      },
    ],
  })
  const [createCommentUpvote] = useMutation(CREATE_COMMENT_UPVOTE, {
    refetchQueries: [
      {
        query: USER_LIKES_COMMENT_QUERY,
        variables: {
          userId: debugUserId,
          commentId: id,
        },
      },
    ],
  })
  // -------------------------------

  // UPDATE

  // Components

  // Question
  const [updateQuestionRating] = useMutation(UPDATE_QUESTION_RATING, {
    refetchQueries: [{ query: refetchQuestionQuery, variables: { id } }],
    onCompleted: () => {
      onCompleted('question')
    },
  })

  // Answer
  const [UpdateAnswerRating] = useMutation(UPDATE_ANSWER_RATING, {
    refetchQueries: [{ query: refetchAnswerQuery, variables: { id } }],
    onCompleted: () => onCompleted('answer'),
  })

  // Comment
  const [UpdateCommentRating] = useMutation(UPDATE_COMMENT_RATING, {
    refetchQueries: [{ query: refetchCommentQuery, variables: { id } }],
    onCompleted: () => onCompleted('comment'),
  })

  // UserLikesX

  const [updateUserLikesQuestion] = useMutation(UPDATE_USER_LIKES_QUESTION, {
    refetchQueries: [
      {
        query: USER_LIKES_QUESTION_QUERY,
        variables: { userId: debugUserId, questionId: id },
      },
    ],
  })

  const [updateUserLikesAnswer] = useMutation(UPDATE_USER_LIKES_ANSWER, {
    refetchQueries: [
      {
        query: USER_LIKES_ANSWER_QUERY,
        variables: { userId: debugUserId, answerId: id },
      },
    ],
  })

  const [updateUserLikesComment] = useMutation(UPDATE_USER_LIKES_COMMENT, {
    refetchQueries: [
      {
        query: USER_LIKES_COMMENT_QUERY,
        variables: { userId: debugUserId, commentId: id },
      },
    ],
  })
  // ------------------------------------------------

  // Component Queries

  // Question query
  const {
    data: questionData,
    loading: questionLoading,
    error: questionError,
  } = useQuery(QUESTION_QUERY, {
    variables: { id },
  })

  // Answer query
  const {
    data: answerData,
    loading: answerLoading,
    error: answerError,
  } = useQuery(ANSWER_QUERY, {
    variables: { id },
  })

  // Comment query
  const {
    data: commentData,
    loading: commentLoading,
    error: commentError,
  } = useQuery(COMMENT_QUERY, {
    variables: { id },
  })
  // ------------------------------------------------

  // UserLikesX Queries

  const { data: userLikesQuestionData } = useQuery(USER_LIKES_QUESTION_QUERY, {
    variables: { questionId: id, userId: debugUserId },
  })

  const { data: userLikesAnswerData } = useQuery(USER_LIKES_ANSWER_QUERY, {
    variables: { answerId: id, userId: debugUserId },
  })

  const { data: userLikesCommentData } = useQuery(USER_LIKES_COMMENT_QUERY, {
    variables: { commentId: id, userId: debugUserId },
  })

  // ------------------------------------------------

  // ---------- Click Events -------------------------

  const downvoteClick = () => {
    setRating(-1)
    console.log('downvoted')
    console.log(new Date().toISOString)
    handleCreateMutation()
  }

  const upvoteClick = () => {
    setRating(1)
    console.log('upvoted')
    handleCreateMutation()
  }

  // ------------------------------------------------

  // ------- Database Mutations ---------------------

  /*
    Höndlar það að búa til dálka í UserLikesX töflum
    og breytir rating hjá componentum
   */
  const handleCreateMutation = () => {
    const input = {
      userId: currentUser.id,
      action: rating,
      dateTime: new Date().toISOString(),
    }
    if (rating === 1 || rating === -1) {
      // Bæta við rating
      console.log(input)

      switch (type) {
        case 'answer':
          const answerInput = { ...input, answerId: id }
          console.log(answerInput)
          console.log(
            createAnswerUpvote({
              variables: { input: answerInput },
            })
              .then(() => {
                console.log(answerData)
                console.log(answerLoading)
                console.log(answerError)
                UpdateAnswerRating({
                  variables: {
                    input: { rating: answerData.answer.rating + rating },
                    id: id,
                  },
                })
              })
              .catch(() => {
                console.log(id)
                console.log(userLikesAnswerData)
                const workingData = userLikesAnswerData.customUserLikesAnswer[0]
                const [newAction, ratingChange] = handleCatch(
                  workingData,
                  rating
                )

                updateUserLikesAnswer({
                  variables: {
                    input: { action: newAction },
                    id: workingData.id,
                  },
                }).then(() => {
                  UpdateAnswerRating({
                    variables: {
                      input: {
                        rating: answerData.answer.rating + ratingChange,
                      },
                      id: id,
                    },
                  })
                })
              })
          )
          break
        case 'question':
          const questionInput = { ...input, questionId: id }
          console.log(
            createQuestionUpvote({
              variables: { input: questionInput },
            })
              .then(() => {
                console.log(questionData)
                console.log(questionLoading)
                console.log(questionError)
                updateQuestionRating({
                  variables: {
                    input: { rating: questionData.question.rating + rating },
                    id: id,
                  },
                })
              })
              .catch(() => {
                // Rating nú þegar til og verður að uppfæra
                console.log('In catch')

                // 1) Query-a eftir id-inu sem failaði (Gert í hook)

                console.log(userLikesQuestionData.customUserLikesQuestion[0])

                // 2) Breyta yfir í rétt form

                // {typeName, id, action}
                const workingData =
                  userLikesQuestionData.customUserLikesQuestion[0]

                // Gefa nýtt rating á component
                const [newAction, ratingChange] = handleCatch(
                  workingData,
                  rating
                )

                // ) Updata rating-ið

                updateUserLikesQuestion({
                  variables: {
                    input: { action: newAction },
                    id: workingData.id,
                  },
                }).then(() => {
                  updateQuestionRating({
                    variables: {
                      input: {
                        rating: questionData.question.rating + ratingChange,
                      },
                      id: id,
                    },
                  })
                })

                toast.success('Endurgjöf breytt!')
              })
          )
          break
        case 'comment':
          const commentInput = { ...input, commentId: id, questionId: 0 }
          console.log(commentInput)
          console.log(
            createCommentUpvote({
              variables: { input: commentInput },
            })
              .then(() => {
                UpdateCommentRating({
                  variables: {
                    input: {
                      rating: commentData.answerComment.rating + rating,
                    },
                    id: id,
                  },
                })
              })
              .catch(() => {
                const workingData =
                  userLikesCommentData.customUserLikesComment[0]
                console.log(workingData)
                const [newAction, ratingChange] = handleCatch(
                  workingData,
                  rating
                )

                updateUserLikesComment({
                  variables: {
                    input: { action: newAction },
                    id: workingData.id,
                  },
                }).then(() => {
                  UpdateCommentRating({
                    variables: {
                      input: {
                        rating: commentData.answerComment.rating + ratingChange,
                      },
                      id: id,
                    },
                  })
                })
              })
          )
          break
        default:
          //Throw exception
          console.log('No type')
      }
    }
  }

  // ------- React UI ----------------------------

  return (
    <>
      <Form onSubmit={handleCreateMutation}>
        <Submit className="blue" onClick={upvoteClick}>
          Upvote
        </Submit>
        <Submit onClick={downvoteClick}>Downvote</Submit>
      </Form>
    </>
  )
}

export default RatingButton

// type : {
//   question
//   answer
//   comment
// }

//const types = ['question', 'answer', 'comment']

//useReducer gæti verið sniðugt hérna þar sem
// það eru 3 mismunandi tilvik eftir því hvort þetta er spurning, svar eða comment
