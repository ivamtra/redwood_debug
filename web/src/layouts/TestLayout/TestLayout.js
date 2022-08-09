import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Head } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import UserCell from 'src/components/UserCell/UserCell'

const TestLayout = ({ children, user }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      {/* Breyta FavIcon hérna */}
      <Head>
        <link rel="icon" type="image/png" href="snack.png" />
      </Head>
      {/* Breyta FavIcon hérna */}

      <Toaster />
      <div className="w-full min-h-screen bg-zinc-200 pt-[96px] px-12">
        <div className="flex flex-col min-w-[200px]">Left Sidebar</div>
        <div className="flex flex-col gap-8">
          {currentUser === null ? (
            <p>Not logged in</p>
          ) : (
            <>
              <UserCell id={currentUser.id} />
              <button type="button" onClick={logOut}>
                Log out
              </button>
            </>
          )}

          <h2>Links</h2>
          <h2>
            <Link to={routes.questions()}>Spurningar </Link>
            <Link to={routes.forms()}>Forms </Link> <br />
            <Link to={routes.test()}>Svör </Link>
            <Link to={routes.commentTest()}>Comment </Link>
            {/* <Link to={routes.answer()}>AnswerPage </Link> <br /> */}
            <Link to={routes.notificationTest()}>Notification test </Link>{' '}
            <br />
            <Link to={routes.issues()}>Issues </Link>
          </h2>
          <main>{children}</main>
        </div>
        <div className="flex flex-col min-w-[350px]">Right Sidebar</div>
      </div>
    </>
  )
}

export default TestLayout
