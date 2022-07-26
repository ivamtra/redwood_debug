import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'

import NotificationsCell from 'src/components/NotificationsCell/NotificationsCell'

const NotificationTestPage = () => {
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
      <NotificationsCell />
    </>
  )
}

export default NotificationTestPage
