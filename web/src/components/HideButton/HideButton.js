import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'

import {
  UPDATE_COMMENT_RATING as UpdateComment,
  UPDATE_ANSWER_RATING as UpdateAnswer,
  UPDATE_QUESTION_RATING as UpdateQuestion,
} from '../RatingButton/RatingButton'
//------------------- GRAPHQL -------------------------------

const HideButton = () => {
  const [updateQuestion] = useMutation(UpdateQuestion)
  const [updateAnswer] = useMutation(UpdateAnswer)
  const [updateComment] = useMutation(UpdateComment)
  const { hasRole } = useAuth()
  return <>{hasRole(['admin', 'moderator']) ? <button>Hide</button> : <></>}</>
}

export default HideButton
