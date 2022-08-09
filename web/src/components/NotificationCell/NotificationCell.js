import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query FindNotificationQuery($id: Int!) {
    notification: notification(id: $id) {
      id
      body
      isSeen
      questionId
      answerId
      userId
      answerCommentId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ notification }) => {
  return (
    <>
      {/* Gamli component */}
      {/* <div>
        <h4>
          <Link
            to={routes.question({
              id: notification.questionId,
              answerId: notification.answerId,
              commentId: notification.answerCommentId,
            })}
          >
            Link
          </Link>
        </h4>

        <p>id = {notification.id}</p>
        <p>body = {notification.body}</p>
        <p>isSeen = {notification.isSeen}</p>
        <p>questionId = {notification.questionId}</p>
        <p>answerId = {notification.answerId}</p>
        <p>userId = {notification.userId}</p>
        <p>answerCommentId = {notification.answerCommentId}</p>
      </div> */}
      {/* Nýji component */}
      <Link
        to={routes.question({
          id: notification.questionId,
          answerId: notification.answerId,
          commentId: notification.answerCommentId,
        })}
      >
        <div className="flex-grow max-w-xs shadow-lg p-4 bg-white text-slate-500 border-b-2">
          <p> {notification.body}</p>
        </div>
      </Link>
    </>
  )
}
