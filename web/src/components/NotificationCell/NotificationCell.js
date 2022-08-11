import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { UPDATE_NOTIFICATION } from 'src/customUtils/GraphQLMutations'

import { QUERY as NotificationsQuery } from '../NotificationsCell/NotificationsCell'
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
  useEffect(() => console.log(notification))
  const { currentUser } = useAuth()
  const [updateNotification] = useMutation(UPDATE_NOTIFICATION, {
    query: NotificationsQuery,
    variables: {
      userId: currentUser?.id,
    },
  })

  const handleNotificationClick = () => {
    if (!notification.isSeen) {
      updateNotification({
        variables: { id: notification.id, input: { isSeen: true } },
      })
    }
  }
  return (
    <>
      {/* Nýji component */}
      <Link
        to={routes.question({
          id: notification.questionId,
          answerId: notification.answerId,
          commentId: notification.answerCommentId,
        })}
        onClick={handleNotificationClick}
      >
        <div className={notification.isSeen ? 'opacity-75' : ''}>
          <div className="flex-grow max-w-xs shadow-lg p-4 bg-white text-slate-500 border-b-2 hover:bg-blue-100">
            <p> {notification.body}</p>
          </div>
        </div>
      </Link>
    </>
  )
}
