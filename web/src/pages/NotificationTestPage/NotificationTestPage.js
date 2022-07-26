import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'

import NotificationCell from 'src/components/NotificationCell/NotificationCell'

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
      <NotificationCell id={1} />
    </>
  )
}

export default NotificationTestPage
