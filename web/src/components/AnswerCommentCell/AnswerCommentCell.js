import { useEffect, useRef, useState } from 'react'

import moment from 'moment'
import { BiDotsVerticalRounded } from 'react-icons/bi'

import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'

import useFocus from 'src/customhooks/useFocus'
import useHidden from 'src/customhooks/useHidden'

import { getTimeAndDateIS } from '../../customUtils/DateUtils'
import DeleteButton from '../DeleteButton/DeleteButton'
import FlagButton from '../FlagButton/FlagButton'
import HideButton from '../HideButton/HideButton'
import RatingButton from '../RatingButton/RatingButton'
import ReplyButton from '../ReplyButton/ReplyButton'

export const QUERY = gql`
  query FindAnswerCommentQuery($id: Int!) {
    answerComment: answerComment(id: $id) {
      id
      answerId
      user {
        email
        id
      }
      body
      createdAt
      parentId
      level
      rating
      isHidden
      questionId
      answer {
        userId
      }
      question {
        userId
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

/*
  Hidden fær hærra priority heldur en Deleted.
  Þ.e. ef shadowbanned user deletar commentið sitt þá
  sér hann deleted en allir hinir sjá ekki neitt.
*/
export const Success = ({ answerComment }) => {
  const [time, date] = getTimeAndDateIS(answerComment.createdAt)
  useEffect(() => {
    console.log(time)
    console.log(date)
  })

  // TODO Fá Indent á comment til að virka
  // * Virkar ekki að nota string interpolation
  const [levelClass, setLevelClass] = useState(
    `relative left-[${answerComment.level * 10}px]`
  )
  const { currentUser, isAuthenticated, hasRole } = useAuth()
  const [actions, setActions] = useState(false)
  const handleActions = () => setActions(!actions)

  // Focus
  const focusRef = useRef()
  const { commentId } = useParams()
  useFocus(focusRef, answerComment.id, commentId)

  // Laga tilfellið þegar user er ekki loggaður inn
  let debugUserId
  if (!isAuthenticated) {
    debugUserId = 0
  } else {
    debugUserId = currentUser.id
  }
  const hidden = useHidden(answerComment)
  return (
    <>
      {hidden ? (
        <></>
      ) : (
        <>
          {/* <div>
            <h2
              className={
                answerComment.isHidden && !currentUser.shadowBanned
                  ? 'hidden'
                  : ''
              }
            >
              {answerComment.body}
            </h2>
            <>
              {answerComment.body !== '[Deleted]' ? (
                <>
                  <RatingButton
                    className=""
                    type={'comment'}
                    id={answerComment.id}
                    compRating={answerComment.rating}
                  />
                  <FlagButton type={'comment'} id={answerComment.id} />
                  <ReplyButton
                    parentId={answerComment.id}
                    answerId={answerComment.answerId}
                    questionId={answerComment.questionId}
                  />
                  <HideButton
                    type={'comment'}
                    id={answerComment.id}
                    isHidden={answerComment.isHidden}
                  />
                  {debugUserId === answerComment.user.id ? (
                    <DeleteButton className id={answerComment.id} />
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </>

            <p className="order-1">Rating: {answerComment.rating}</p>
            <p>answerId = {answerComment.answerId}</p>
            <p>questionId = {answerComment.questionId}</p>
            <p>id = {answerComment.id}</p>
            <p ref={focusRef}>{answerComment.createdAt}</p>

            {answerComment.body !== '[Deleted]' ? (
              <p className="order-1">{answerComment.user.email}</p>
            ) : (
              <></>
            )}
            <p className="order-1">parentId: {answerComment.parentId}</p>
            <p>level: {answerComment.level}</p>
          </div> */}
        </>
      )}

      {/* Nýr component */}
      <div
        className={
          answerComment.isHidden && !currentUser.shadowbanned
            ? 'flex-grow max-w-[350px] shadow-lg p-4 rounded-lg bg-white opacity-50 text-slate-500'
            : 'flex-grow max-w-[350px] shadow-lg p-4 rounded-lg bg-white text-slate-500'
        }
      >
        <div className="flex flex-col">
          <div className="flex">
            {/* Up and down voting and rating */}
            <div className="text-sm">
              <RatingButton
                id={answerComment.id}
                type="comment"
                compRating={answerComment.rating}
              />
            </div>

            {/* Main section */}
            <div className="relative flex-grow flex flex-col pl-8">
              {/* Flag and Hide action sections */}
              <ul
                className={
                  !actions
                    ? 'hidden'
                    : 'absolute bg-zinc-100 px-8 py-4 top-0 right-4 rounded-md shadow-lg'
                }
              >
                <li className="cursor-pointer pb-1 border-b-2 border-zinc-300">
                  <ReplyButton
                    parentId={answerComment.id}
                    answerId={answerComment.answerId}
                    questionId={answerComment.questionId}
                  />
                </li>
                <li
                  className={
                    hasRole(['admin', 'moderator'])
                      ? 'border-b-2 border-zinc-300 cursor-pointer pb-1 pt-1'
                      : ' border-zinc-300 cursor-pointer pb-1 pt-1'
                  }
                >
                  {/* Flag */}
                  <FlagButton type={'question'} id={answerComment.id} />
                </li>
                <li className=" cursor-pointer pt-1">
                  <HideButton
                    type={'answerComment'}
                    id={answerComment.id}
                    isHidden={answerComment.isHidden}
                  />
                </li>
              </ul>
              {/* Vertical dots */}
              <div className="ml-auto cursor-pointer">
                <BiDotsVerticalRounded onClick={handleActions} />
              </div>
              {/* Comment Body */}
              <h2 className="text-sm flex items-center gap-2">
                {answerComment.body}{' '}
              </h2>
              <hr className="mt-2" />

              {/* Submitted by section */}
              <div className="text-right text-xs italic mt-4">
                Sent inn af <strong>{answerComment.user.email}</strong> {'    '}
                <strong>{date}</strong> | <strong>{time}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
