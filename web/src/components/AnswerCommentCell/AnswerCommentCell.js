import { useAuth } from '@redwoodjs/auth'

import useHidden from 'src/customhooks/useHidden'

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
  const { currentUser } = useAuth()
  const hidden = useHidden(answerComment)
  return (
    <>
      {hidden ? (
        <></>
      ) : (
        <>
          <div className="grid grid-cols-4">
            <h2>{answerComment.body}</h2>
            <>
              {answerComment.body !== '[Deleted]' ? (
                <>
                  <RatingButton
                    className=""
                    type={'comment'}
                    id={answerComment.id}
                  />
                  <FlagButton type={'comment'} id={answerComment.id} />
                  <ReplyButton
                    parentId={answerComment.id}
                    answerId={answerComment.answerId}
                  />
                  <HideButton type={'comment'} id={answerComment.id} />
                  {currentUser.id === answerComment.user.id ? (
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
            <p>id = {answerComment.id}</p>
            <p>{answerComment.createdAt}</p>

            {answerComment.body !== '[Deleted]' ? (
              <p className="order-1">{answerComment.user.email}</p>
            ) : (
              <></>
            )}
            <p className="order-1">parentId: {answerComment.parentId}</p>
            <p>level: {answerComment.level}</p>
          </div>
        </>
      )}
    </>
  )
}
