import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import NotificationsCell from 'src/components/NotificationsCell/NotificationsCell'

const NotificationTestPage = () => {
  const { currentUser } = useAuth()
  useEffect(() => console.log(currentUser))
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
      <NotificationsCell userId={currentUser?.id} />
    </>
  )
}

export default NotificationTestPage
