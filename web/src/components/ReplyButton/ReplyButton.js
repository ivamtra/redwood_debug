import { useState } from 'react'

import AnswerCommentForm from '../AnswerCommentForm/AnswerCommentForm'

const ReplyButton = ({ answerId, parentId, questionId }) => {
  const [isClicked, setIsClicked] = useState(false)
  const onClick = () => {
    setIsClicked(!isClicked)
  }
  return (
    <div>
      <button onClick={onClick}>Reply</button>
      <div>
        {isClicked ? (
          <AnswerCommentForm
            parentId={parentId}
            answerId={answerId}
            questionId={questionId}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default ReplyButton
