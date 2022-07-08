import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'

import DeleteButton from '../DeleteButton/DeleteButton'
import FlagButton from '../FlagButton/FlagButton'
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
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ answerComment }) => {
  const { currentUser } = useAuth()
  return (
    <div>
      <h1>----------------------------------</h1>
      <h2>{answerComment.body}</h2>
      <>
        {answerComment.body !== '[Deleted]' &&
        answerComment.user.id === currentUser.id ? (
          <>
            <RatingButton type={'comment'} id={answerComment.id} />
            <FlagButton type={'comment'} id={answerComment.id} />
            <ReplyButton
              parentId={answerComment.id}
              answerId={answerComment.answerId}
            />
            <DeleteButton id={answerComment.id} />
          </>
        ) : (
          <></>
        )}
      </>

      <p>Rating: {answerComment.rating}</p>
      <p>answerId = {answerComment.answerId}</p>
      <p>id = {answerComment.id}</p>
      <p>{answerComment.createdAt}</p>

      {answerComment.body !== '[Deleted]' ? (
        <p>{answerComment.user.email}</p>
      ) : (
        <></>
      )}
      <p>parentId: {answerComment.parentId}</p>
      <p>level: {answerComment.level}</p>
    </div>
  )
}
