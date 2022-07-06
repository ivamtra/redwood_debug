/* eslint-disable no-case-declarations */
//TODO: Refactora
//TODO: ENUM fyrir tegund af component?
//TODO: CSS til að merkja hvort að takkinn hafi verið smelltur
import { useState } from 'react' //

import { useAuth } from '@redwoodjs/auth'
import { Submit, Form } from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

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
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [rating, setRating] = useState(0)
  // CREATE
  const [createQuestionUpvote] = useMutation(CREATE_QUESTION_UPVOTE)
  const [createAnswerUpvote] = useMutation(CREATE_ANSWER_UPVOTE)
  const [createCommentUpvote] = useMutation(CREATE_COMMENT_UPVOTE)
  // -------------------------------
  // UPDATE
  const [updateQuestionRating] = useMutation(UPDATE_QUESTION_RATING, {
    refetchQueries: [{ query: refetchQuestionQuery }],
    onCompleted: () => {
      if (rating === -1) {
        toast.success('downvoted')
      } else {
        toast.success('upvoted')
      }
    },
  })
  // --------------------------------
  // QUERY
  // question query
  const {
    data: questionData,
    loading: questionLoading,
    error: questionError,
  } = useQuery(QUESTION_QUERY, {
    variables: { id },
  })
  // answer query
  const {
    data: answerData,
    loading: answerLoading,
    error: answerError,
  } = useQuery(ANSWER_QUERY, {
    variables: { id },
  })

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
          )
          break
        case 'question':
          const questionInput = { ...input, questionId: id }
          console.log(
            createQuestionUpvote({
              variables: { input: questionInput },
            }).then((result) => {
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
