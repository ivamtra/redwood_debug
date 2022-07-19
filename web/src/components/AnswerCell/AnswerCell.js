import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { routes, Link } from '@redwoodjs/router'

import AnswerCommentForm from '../AnswerCommentForm/AnswerCommentForm'
import AnswerCommentsCell from '../AnswerCommentsCell/AnswerCommentsCell'
import FlagButton from '../FlagButton/FlagButton'
import HideButton from '../HideButton/HideButton'
import RatingButton from '../RatingButton/RatingButton'
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
  useEffect(() => {
    console.log(answer.isHidden)
    console.log(answer.user.id)
  })
  const { hasRole, currentUser } = useAuth()
  return (
    <div>
      {answer.isHidden &&
      answer.user.id !== currentUser.id &&
      !hasRole(['moderator', 'admin']) ? (
        <></>
      ) : (
        <>
          <div>
            <RatingButton id={answer.id} type={'answer'} />
            <FlagButton id={answer.id} type={'answer'} />
            {/* <HideButton id={answer.id} type={'answer'} /> */}
            <p>answer.id = {answer.id}</p>
            <p>Rating: {answer.rating}</p>
            <p>Dagsetning: {answer.createdAt}</p>
            <h4>User: {answer.user.email}</h4>
          </div>
          <div>
            <h2>Titill: {answer.title} (Getur verið ekkert)</h2>
            <h3>Rökstuðningur: {answer.justification}</h3>
            <p>answer.questionId = {answer.questionId}</p>
          </div>
          {/* <Link to={routes.answer({ id: answer.id })} /> */}
          <AnswerCommentForm answerId={answer.id} parentId={0} />
          <AnswerCommentsCell answerId={answer.id} />
        </>
      )}
    </div>
  )
}
