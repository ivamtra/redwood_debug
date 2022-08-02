import { useEffect, useLayoutEffect, useRef } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes, useParams } from '@redwoodjs/router'

import useFocus from 'src/customhooks/useFocus'
import useHidden from 'src/customhooks/useHidden'

import AnswerCommentForm from '../AnswerCommentForm/AnswerCommentForm'
import AnswerCommentsCell from '../AnswerCommentsCell/AnswerCommentsCell'
import FlagButton from '../FlagButton/FlagButton'
import HideButton from '../HideButton/HideButton'
import RatingButton from '../RatingButton/RatingButton'
import TranslationsCell from '../TranslationsCell/TranslationsCell'
export const QUERY = gql`
  query FindAnswerQuery($id: Int!) {
    answer: answer(id: $id) {
      id
      title
      justification
      userId
      user {
        email
        id
      }
      createdAt
      questionId
      translations {
        id
        translation
      }
      rating
      isHidden
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Engin svör komin</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

//TODO: Uncommenta þegar búið er að laga api
export const Success = ({ answer }) => {
  // TODO: Focusa þegar parameter fæst
  // useFocus(focusRef)
  const hidden = useHidden(answer)
  const { hasRole } = useAuth()
  const focusRef = useRef()
  const { currentUser } = useAuth()
  const { answerId: paramId } = useParams()

  // Focus á element ef komið er frá notification
  useFocus(focusRef, answer.id, paramId)

  return (
    <div>
      {hidden ? (
        <></>
      ) : (
        <>
          <div>
            <div>
              <h2
                className={
                  answer.isHidden && !currentUser.shadowBanned ? 'hidden' : ''
                }
              >
                Titill: {answer.title} (Getur verið ekkert)
              </h2>
              <h3 ref={focusRef}>Rökstuðningur: {answer.justification}</h3>
              <p>answer.questionId = {answer.questionId}</p>
            </div>
            {hasRole(['moderator', 'admin']) ? (
              <HideButton
                id={answer.id}
                type={'answer'}
                isHidden={answer.isHidden}
              />
            ) : (
              <></>
            )}
            <RatingButton
              id={answer.id}
              type={'answer'}
              compRating={answer.rating}
            />
            <FlagButton id={answer.id} type={'answer'} />
            {/* <HideButton id={answer.id} type={'answer'} /> */}
            <p>answer.id = {answer.id}</p>
            <p>Rating: {answer.rating}</p>
            <p>Dagsetning: {answer.createdAt}</p>
            <h4>User: {answer.user.email}</h4>
          </div>
          {/* TODO: Disable þegar isHidden er true */}
          <TranslationsCell answerId={answer.id} />
          <AnswerCommentForm answerId={answer.id} parentId={0} questionId={0} />
          <AnswerCommentsCell answerId={answer.id} questionId={0} />
        </>
      )}
    </div>
  )
}
