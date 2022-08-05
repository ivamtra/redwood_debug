import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import moment from 'moment'
import { BiDotsVerticalRounded } from 'react-icons/bi'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes, useParams } from '@redwoodjs/router'

import useFocus from 'src/customhooks/useFocus'
import useHidden from 'src/customhooks/useHidden'

import { getTimeAndDateIS } from '../../customUtils/DateUtils'
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
  const [actions, setActions] = useState(false)
  const hidden = useHidden(answer)
  const { hasRole } = useAuth()
  const focusRef = useRef()
  const { currentUser } = useAuth()
  const { answerId: paramId } = useParams()
  const handleActions = () => setActions(!actions)
  const [time, date] = getTimeAndDateIS(answer.createdAt)

  // Focus á element ef komið er frá notification
  useFocus(focusRef, answer.id, paramId)

  return (
    <div>
      {hidden ? (
        <></>
      ) : (
        <>
          {/* Gamli componentinn */}
          {/* <div>
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
          {/* <p>answer.id = {answer.id}</p>
            <p>Rating: {answer.rating}</p>
            <p>Dagsetning: {answer.createdAt}</p>
            <h4>User: {answer.user.email}</h4> */}
          {/* </div>  */}

          {/* Hér byrjar nýji componentinn */}
          <div
            className={
              answer.isHidden && !currentUser.shadowBanned
                ? 'flex-grow max-w-[700px] shadow-lg p-4 rounded-lg bg-white text-slate-500 opacity-50'
                : 'flex-grow max-w-[700px] shadow-lg p-4 rounded-lg bg-white text-slate-500'
            }
          >
            <div className="flex flex-col">
              <div className="flex">
                {/* Rating Button */}
                <RatingButton
                  id={answer.id}
                  type={'answer'}
                  compRating={answer.rating}
                />
                {/* Aðal section */}
                <div
                  ref={focusRef}
                  className="relative flex-grow flex flex-col pl-8"
                >
                  {/* Flag and Hide action sections */}
                  <ul
                    className={
                      !actions
                        ? 'hidden'
                        : 'absolute bg-zinc-100 px-8 py-4 top-0 right-4 rounded-md shadow-lg'
                    }
                  >
                    <li
                      className={
                        hasRole(['admin', 'moderator'])
                          ? 'border-b-2 border-zinc-300 cursor-pointer pb-2'
                          : ' border-zinc-300 cursor-pointer pb-2'
                      }
                    >
                      {/* Flag */}
                      <FlagButton type={'answer'} id={answer.id} />
                    </li>
                    <li className=" cursor-pointer pt-2">
                      <HideButton
                        type={'answer'}
                        id={answer.id}
                        isHidden={answer.isHidden}
                      />
                    </li>
                  </ul>
                  {/* Vertical dots */}
                  <div className="ml-auto cursor-pointer">
                    <BiDotsVerticalRounded onClick={() => handleActions()} />
                  </div>
                  {/* Answer title */}
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {answer?.title}{' '}
                  </h2>
                  <hr className="mt-2" />

                  {/* Definition */}
                  <div className="mt-4">
                    <div className="-indent-16 ml-16  leading-relaxed">
                      <span className="font-bold">Rökstuðningur: </span>
                      {answer.justification}
                    </div>
                  </div>

                  {/* Translations */}
                  <TranslationsCell answerId={answer.id} />

                  {/* Submitted by section */}
                  <div className="text-right text-xs italic mt-4">
                    Sent inn af <strong>{answer.user.email}</strong>
                    {'   '}
                    <strong>{date}</strong> | <strong>{time}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments o.fl. */}
          {/* TODO: Disable þegar isHidden er true */}
          {/* <TranslationsCell answerId={answer.id} /> */}
          <AnswerCommentForm answerId={answer.id} parentId={0} questionId={0} />
          <AnswerCommentsCell answerId={answer.id} questionId={0} />
        </>
      )}
    </div>
  )
}
