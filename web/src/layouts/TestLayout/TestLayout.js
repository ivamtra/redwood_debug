import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import UserCell from 'src/components/UserCell/UserCell'

const TestLayout = ({ children, user }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  useEffect(() => console.log(currentUser))

  return (
    <>
      {currentUser === null ? (
        <p>Not logged in</p>
      ) : (
        <UserCell id={currentUser.id} />
      )}
      <h2>Links</h2>
      <h2>
        <Link to={routes.forms()}>Forms </Link>
        <Link to={routes.home()}>Home</Link>
      </h2>
      <main>{children}</main>
    </>
  )
}

export default TestLayout
