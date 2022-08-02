import { useEffect } from 'react'

import { BiDotsVerticalRounded } from 'react-icons/bi'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import useHidden from 'src/customhooks/useHidden'

import AnswerCommentForm from '../AnswerCommentForm/AnswerCommentForm'
import AnswerCommentsCell from '../AnswerCommentsCell'
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
  const { currentUser } = useAuth()
  const hidden = useHidden(question)
  return (
    <div className="flex-grow max-w-[700px] shadow-lg p-4 rounded-lg bg-white text-slate-500">
      {hidden ? (
        <></>
      ) : (
        <>
          {inQuestionsCell ? (
            <h1
              className={
                question.isHidden && !currentUser.shadowBanned ? 'hidden' : ''
              }
            >
              <Link to={routes.question({ id: question.id })}>
                Titill: {question.title}
              </Link>
            </h1>
          ) : (
            <h1>Titill: {question.title}</h1>
          )}
          <div>
            <HideButton
              type={'question'}
              id={question.id}
              isHidden={question.isHidden}
            />
            <RatingButton
              id={question.id}
              type="question"
              compRating={question.rating}
            />

            {/* Question and definition section */}
            <div className="relative flex-grow flex flex-col pl-8">
              {/* Vertical dots part */}
              <div className="ml-auto cursor-pointer">
                <BiDotsVerticalRounded onClick={() => handleActions()} />
              </div>

              {/* Question title */}
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Link to={routes.question({ id: question.id })}>
                  {question?.title}{' '}
                </Link>
                <span className="text-sm font-light underline decoration-dashed flex items-center gap-2">
                  ({question?.language})
                </span>
              </h2>
              <hr className="mt-2" />

              {/* Definition */}
              <div className="mt-4">
                <div className="-indent-16 ml-16  leading-relaxed">
                  <span className="font-bold">Definition: </span>
                  {question?.definition}
                </div>
              </div>

              {/* Other info section */}
              <div className="mt-4">
                <div className="-indent-16 ml-16  leading-relaxed">
                  <span className="font-bold">Other Information: </span>
                  {question?.other_info}
                </div>
              </div>

              {/* Submitted by section */}
              <div className="text-right text-xs italic mt-4">
                Submitted by <strong>{question?.username}</strong> at{' '}
                <strong>{moment(question?.createdAt).format('hh:mm')}</strong>{' '}
                on{' '}
                <strong>
                  {moment(question?.createdAt).format('MMM Do YYYY')}
                </strong>
              </div>

              <FlagButton type={'question'} id={question.id} />
              <p>Rating: {question.rating}</p>
              <p>Dagsetning: {question.createdAt}</p>
              <p>User: {question.user.email}</p>
            </div>
            <SentencesCell questionId={question.id} />
            {!inQuestionsCell ? (
              <div>
                <AnswerCommentForm
                  answerId={0}
                  parentId={0}
                  questionId={question.id}
                />
                <AnswerCommentsCell answerId={0} questionId={question.id} />
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
          </div>
        </>
      )}
    </div>
  )
}
