import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'

import {
  UPDATE_COMMENT_RATING as UpdateComment,
  UPDATE_ANSWER_RATING as UpdateAnswer,
  UPDATE_QUESTION_RATING as UpdateQuestion,
} from '../RatingButton/RatingButton'
//------------------- GRAPHQL -------------------------------
const [question, answer, comment] = ['question', 'answer', 'comment']

const HideButton = ({ type, id }) => {
  /*
    Updatar gildi á component þannig isHidden verður true
  */
  const hideComponent = () => {
    const variables = { id: id, input: { isHidden: true } }

    switch (type) {
      case question:
        updateQuestion({ variables: variables })
        break
      case answer:
        updateAnswer({ variables: variables })
        break
      case comment:
        updateComment({ variables: variables })
        break
      default:
        console.log('Invalid type')
        break
    }
  }

  const [updateQuestion] = useMutation(UpdateQuestion)
  const [updateAnswer] = useMutation(UpdateAnswer)
  const [updateComment] = useMutation(UpdateComment)
  const { hasRole } = useAuth()

  return (
    <>
      {hasRole(['admin', 'moderator']) ? (
        <button onClick={hideComponent}>Hide</button>
      ) : (
        <></>
      )}
    </>
  )
}

export default HideButton
