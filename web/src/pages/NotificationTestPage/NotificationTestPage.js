import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'

const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($input: CreateNotificationInput!) {
    createNotification(input: $input) {
      id
    }
  }
`

const NotificationTestPage = () => {
  const [createNotification] = useMutation(CREATE_NOTIFICATION)
  const inputData = {
    body: 'GraphQL test',
    isSeen: false,
    userId: 0,
    answerId: 0,
    answerCommentId: 0,
    questionId: 0,
  }

  const notify = () => {
    createNotification({ variables: { input: inputData } })
  }
  return (
    <>
      <MetaTags title="NotificationTest" description="NotificationTest page" />

      <h1>NotificationTestPage</h1>
      <p>
        Find me in{' '}
        <code>
          ./web/src/pages/NotificationTestPage/NotificationTestPage.js
        </code>
      </p>
      <p>
        My default route is named <code>notificationTest</code>, link to me with
        `<Link to={routes.notificationTest()}>NotificationTest</Link>`
      </p>
      <button onClick={notify}>Notification test</button>
    </>
  )
}

export default NotificationTestPage
