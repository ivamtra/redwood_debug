import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import AnswerForm from '../AnswerForm'
import AnswersCell from '../AnswersCell'
import FlagButton from '../FlagButton/FlagButton'
import HideButton from '../HideButton/HideButton'
import RatingButton from '../RatingButton/RatingButton'
import SentencesCell from '../SentencesCell'
export const QUERY = gql`
  query FindQuestionQuery($id: Int!) {
    question: question(id: $id) {
      id
      title
      language
      definition
      other_info
      userId
      createdAt
      user {
        id
        name
        email
      }
      rating
      isHidden
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ question, inQuestionsCell }) => {
  const { hasRole, currentUser } = useAuth()
  return (
    <div>
      {question.isHidden &&
      question.user.id !== currentUser.id &&
      !hasRole(['admin', 'moderator']) ? (
        <></>
      ) : (
        <>
          <h1>---------------------------------------</h1>
          {inQuestionsCell ? (
            <h1>
              <Link to={routes.question({ id: question.id })}>
                Titill: {question.title}
              </Link>
            </h1>
          ) : (
            <h1>Titill: {question.title}</h1>
          )}
          <div>
            <HideButton type={'question'} id={question.id} />
            <RatingButton id={question.id} type="question" />
            <FlagButton type={'question'} id={question.id} />
            <p>Rating: {question.rating}</p>
            <p>Dagsetning: {question.createdAt}</p>
            <p>User: {question.user.email}</p>
          </div>
          <div>
            <h3>Tungumál: {question.language}</h3>
            <h3>Aðrar upplýsingar: {question.other_info}</h3>
          </div>
          <h3>Setningar</h3>
          <div>
            <SentencesCell questionId={question.id} />
          </div>
          {!inQuestionsCell ? (
            <div>
              <h1>---------------------------------------</h1>
              <h1>Answer form</h1>
              <AnswerForm questionId={question.id} />
              <h1>---------------------------------------</h1>
              <AnswersCell questionId={question.id} />
              {/* <Link to={routes.answer({ id: question.id })} /> */}
            </div>
          ) : (
            <div></div>
          )}
        </>
      )}
    </div>
  )
}
