import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import UserCell from 'src/components/UserCell/UserCell'

const TestLayout = ({ children, user }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      <Toaster />
      {currentUser === null ? (
        <p>Not logged in</p>
      ) : (
        <UserCell id={currentUser.id} />
      )}
      <h2>Links</h2>
      <h2>
        <Link to={routes.questions()}>Spurningar </Link>
        <Link to={routes.forms()}>Forms </Link> <br />
        <Link to={routes.test()}>Svör </Link>
        <Link to={routes.commentTest()}>Comment </Link>
      </h2>
      <main>{children}</main>
    </>
  )
}

export default TestLayout
