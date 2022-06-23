import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
const CREATE_QUESTION_UPVOTE = gql`
  mutation CreateQuestionUpvote($input: CreateUserLikesQuestionInput!) {
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

//useReducer gæti verið sniðugt hérna þar sem
// það eru 3 mismunandi tilvik eftir því hvort þetta er spurning, svar eða comment
const RatingButton = ({ type, id }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [rating, setRating] = useState(0)
  const [createQuestionUpvote] = useMutation(CREATE_QUESTION_UPVOTE)

  const downvoteClick = () => {
    setRating(-1)
    console.log('downvoted')
  }

  const upvoteClick = () => {
    setRating(1)
    console.log('upvoted')
  }

  return (
    <div>
      <button onClick={upvoteClick}>Upvote</button>
      <button onClick={downvoteClick}>Downvote</button>
    </div>
  )
}

export default RatingButton
