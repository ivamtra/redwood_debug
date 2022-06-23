//FIXME: Vantar að ýta tvisvar til að þetta virki

import { useState } from 'react' //

import { useAuth } from '@redwoodjs/auth'
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
    createUserLikesQuestion(input: $input) {
      id
    }
  }
`

const CREATE_COMMENT_UPVOTE = gql`
  mutation CreateCommentUpvote($input: CreateUserLikesCommentInput!) {
    createUserLikesQuestion(input: $input) {
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
    setRating(-1)
    console.log('downvoted')
    console.log(new Date().toISOString)
    handleMutation()
  }

  const upvoteClick = () => {
    setRating(1)
    console.log('upvoted')
    handleMutation()
  }
  const handleMutation = () => {
    const input = {
      userId: currentUser.id,
      action: rating,
      questionId: id,
      dateTime: new Date().toISOString(),
    }
    if (rating === 1 || rating === -1) {
      // Bæta við rating
      console.log(input)

      //FIXME: Vill ekki nota default datetime wtf??

      switch (type) {
        case 'question':
          console.log(
            createQuestionUpvote({
              variables: { input: input },
            })
          )
          break
        case 'answer':
          console.log(
            createAnswerUpvote({
              variables: { input: input },
            })
          )
          break
        case 'comment':
          console.log(
            createCommentUpvote({
              variables: { input: input },
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
      <button onClick={upvoteClick}>Upvote</button>
      <button onClick={downvoteClick}>Downvote</button>
    </div>
  )
}

export default RatingButton
