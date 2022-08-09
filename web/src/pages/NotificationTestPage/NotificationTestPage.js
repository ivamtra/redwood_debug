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

      <h1 className="text-xl text-slate-800">
        Hér kemur notification component sem fer í navbar{' '}
      </h1>
      <NotificationsCell userId={currentUser?.id} />
    </>
  )
}

export default NotificationTestPage
