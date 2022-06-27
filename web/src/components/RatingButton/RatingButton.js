/* eslint-disable no-case-declarations */
//FIXME: Vantar að ýta tvisvar til að þetta virki
//TODO: Refactora
//TODO: ENUM fyrir tegund af component?
//TODO: CSS til að merkja hvort að takkinn hafi verið smelltur
import { useState } from 'react' //

import { useAuth } from '@redwoodjs/auth'
import { Submit } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
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
// type : {
//   question
//   answer
//   comment
// }

const types = ['question', 'answer', 'comment']

//useReducer gæti verið sniðugt hérna þar sem
// það eru 3 mismunandi tilvik eftir því hvort þetta er spurning, svar eða comment
const RatingButton = ({ type, id }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [rating, setRating] = useState(0)
  const [createQuestionUpvote] = useMutation(CREATE_QUESTION_UPVOTE)
  const [createAnswerUpvote] = useMutation(CREATE_ANSWER_UPVOTE)
  const [createCommentUpvote] = useMutation(CREATE_COMMENT_UPVOTE)

  const downvoteClick = () => {
    // Breyta seinna til að höndla það að taka burt rating-ið
    setRating(-1)
    console.log('downvoted')
    console.log(new Date().toISOString)
    handleMutation()
  }

  const upvoteClick = () => {
    // Breyta seinna til að höndla það að taka burt rating-ið
    setRating(1)
    console.log('upvoted')
    handleMutation()
  }
  const handleMutation = () => {
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
      <Submit onClick={upvoteClick}>Upvote</Submit>
      <Submit onClick={downvoteClick}>Downvote</Submit>
    </div>
  )
}

export default RatingButton
