/* eslint-disable no-case-declarations */
//TODO: Refactora
//TODO: ENUM fyrir tegund af component?
//TODO: CSS til að merkja hvort að takkinn hafi verið smelltur
import { useState } from 'react' //

import { useAuth } from '@redwoodjs/auth'
import { Submit, Form } from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { QUERY as refetchAnswerQuery } from '../AnswerCell'
import { QUERY as refetchCommentQuery } from '../AnswerCommentCell'
import { QUERY as refetchQuestionQuery } from '../QuestionCell'

// ----------- GRAPHQL --------------------------

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

// ----------- UPDATE --------------------------

const UPDATE_QUESTION_RATING = gql`
  mutation UpdateQuestionRating($id: Int!, $input: UpdateQuestionInput!) {
    updateQuestion(id: $id, input: $input) {
      id
    }
  }
`

const UPDATE_ANSWER_RATING = gql`
  mutation UpdateAnswerRating($id: Int!, $input: UpdateAnswerInput!) {
    updateAnswer(id: $id, input: $input) {
      id
    }
  }
`

const UPDATE_COMMENT_RATING = gql`
  mutation UpdateCommentRating($id: Int!, $input: UpdateAnswerCommentInput!) {
    updateAnswerComment(id: $id, input: $input) {
      id
    }
  }
`

// ---------------------------------------------

// ----------- QUERY ---------------------------

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

// ---------------------------------------------

// type : {
//   question
//   answer
//   comment
// }

//const types = ['question', 'answer', 'comment']

//useReducer gæti verið sniðugt hérna þar sem
// það eru 3 mismunandi tilvik eftir því hvort þetta er spurning, svar eða comment
const RatingButton = ({ type, id }) => {
  // ------------ OnCompleted ------------------------

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

  // --------- DATABASE ------------------------------

  // -------------------------------------------------

  // CREATE
  const [createQuestionUpvote] = useMutation(CREATE_QUESTION_UPVOTE)
  const [createAnswerUpvote] = useMutation(CREATE_ANSWER_UPVOTE)
  const [createCommentUpvote] = useMutation(CREATE_COMMENT_UPVOTE)
  // -------------------------------
  // UPDATE

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
  // ------------------------------------------------

  // QUERY

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

  // ---------- Click Events -------------------------

  const downvoteClick = () => {
    // Breyta seinna til að höndla það að taka burt rating-ið
    setRating(-1)
    console.log('downvoted')
    console.log(new Date().toISOString)
    handleCreateMutation()
  }

  const upvoteClick = () => {
    // Breyta seinna til að höndla það að taka burt rating-ið
    setRating(1)
    console.log('upvoted')
    handleCreateMutation()
  }

  // ------------------------------------------------

  // ------- Database Mutations ---------------------

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
            }).then(() => {
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
          )
          break
        case 'question':
          const questionInput = { ...input, questionId: id }
          console.log(
            createQuestionUpvote({
              variables: { input: questionInput },
            }).then(() => {
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
          )
          break
        case 'comment':
          const commentInput = { ...input, commentId: id, questionId: 0 }
          console.log(commentInput)
          console.log(
            createCommentUpvote({
              variables: { input: commentInput },
            }).then(() => {
              UpdateCommentRating({
                variables: {
                  input: { rating: commentData.answerComment.rating + rating },
                  id: id,
                },
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

  return (
    <div>
      <Form onSubmit={handleCreateMutation}>
        <Submit
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-1"
          onClick={upvoteClick}
        >
          Upvote
        </Submit>
        <Submit
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mx-1"
          onClick={downvoteClick}
        >
          Downvote
        </Submit>
      </Form>
    </div>
  )
}

export default RatingButton
