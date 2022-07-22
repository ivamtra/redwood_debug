import { useEffect, useRef } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes, useParams } from '@redwoodjs/router'

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
  const testFocus = () => {
    console.log('In test focus')
    testRef.current.scrollIntoView()
  }

  // TODO: Focusa þegar parameter fæst
  const { answerId: paramAnswerId } = useParams()

  useEffect(() => {
    console.log(parseInt(paramAnswerId) === answer.id)
    if (parseInt(paramAnswerId) === answer.id) {
      console.log('In if block')
      testFocus()
    }
  }, [answer.id])
  const hidden = useHidden(answer)
  const { hasRole } = useAuth()
  const testRef = useRef()
  const { currentUser } = useAuth()
  return (
    <div>
      {hidden ? (
        <></>
      ) : (
        <>
          <div>
            <div>
              <button onClick={testFocus}>Test Focus</button>

              <h2
                ref={testRef}
                className={
                  answer.isHidden && !currentUser.shadowBanned ? 'hidden' : ''
                }
              >
                Titill: {answer.title} (Getur verið ekkert)
              </h2>
              <h3>Rökstuðningur: {answer.justification}</h3>
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
            <RatingButton id={answer.id} type={'answer'} />
            <FlagButton id={answer.id} type={'answer'} />
            {/* <HideButton id={answer.id} type={'answer'} /> */}
            <p>answer.id = {answer.id}</p>
            <p>Rating: {answer.rating}</p>
            <p>Dagsetning: {answer.createdAt}</p>
            <h4>User: {answer.user.email}</h4>
          </div>
          {/* TODO: Disable þegar isHidden er true */}
          <TranslationsCell answerId={answer.id} />
          <AnswerCommentForm answerId={answer.id} parentId={0} />
          <AnswerCommentsCell answerId={answer.id} />
        </>
      )}
    </div>
  )
}
