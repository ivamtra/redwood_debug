import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'

import {
  UPDATE_COMMENT_RATING as UpdateComment,
  UPDATE_ANSWER_RATING as UpdateAnswer,
  UPDATE_QUESTION_RATING as UpdateQuestion,
} from 'src/customUtils/GraphQLMutations'

import { QUERY as refetchAnswerQuery } from '../AnswerCell'
import { QUERY as refetchCommentQuery } from '../AnswerCommentCell'
import { QUERY as refetchQuestionQuery } from '../QuestionCell'

// UPDATE_COMMENT_RATING as UpdateComment,
//   UPDATE_ANSWER_RATING as UpdateAnswer,
//   UPDATE_QUESTION_RATING as UpdateQuestion,

//------------------- GRAPHQL -------------------------------
const [question, answer, comment] = ['question', 'answer', 'comment']

const HideButton = ({ type, id, isHidden }) => {
  /*
    Updatar gildi á component þannig isHidden verður true
  */
  const hideComponent = () => {
    const variables = { id: id, input: { isHidden: !isHidden } }

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

  const [updateQuestion] = useMutation(UpdateQuestion, {
    refetchQueries: [{ query: refetchQuestionQuery, variables: { id } }],
  })
  const [updateAnswer] = useMutation(UpdateAnswer, {
    refetchQueries: [{ query: refetchAnswerQuery, variables: { id } }],
  })
  const [updateComment] = useMutation(UpdateComment, {
    refetchQueries: [{ query: refetchCommentQuery, variables: { id } }],
  })
  const { hasRole } = useAuth()

  return (
    <>
      {hasRole(['admin', 'moderator']) ? (
        <button onClick={hideComponent}>{isHidden ? 'Unhide' : 'Hide'}</button>
      ) : (
        <></>
      )}
    </>
  )
}

export default HideButton
