import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Head } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import Navbar from 'src/components/Navbar/Navbar'
import UserCell from 'src/components/UserCell/UserCell'

const TestLayout = ({ children, user }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      <Navbar />
      {/* Breyta FavIcon hérna */}
      <Head className="bg-slate-600">
        <link rel="icon" type="image/png" href="pied-piper.png" />
      </Head>
      {/* Breyta FavIcon hérna */}

      <Toaster />
      <div className="bg-[#e6f3ff] pt-[96px] flex h-max font-body">
        <div className="flex flex-col w-1/6 align-middle justify-between items-center">
          <p>Left Sidebar</p>
          <p>Content</p>
          <p>Content</p>
        </div>
        <div className="flex flex-col w-4/6">
          {/* {currentUser === null ? (
            <p>Not logged in</p>
          ) : (
            <>
              <UserCell id={currentUser.id} />
              <button type="button" onClick={logOut}>
                Log out
              </button>
            </>
          )} */}

          {/* <h2>Links</h2>
          <h2>
            <Link to={routes.questions()}>Spurningar </Link>
            <Link to={routes.forms()}>Forms </Link> <br />
            <Link to={routes.test()}>Svör </Link>
            <Link to={routes.commentTest()}>Comment </Link>
            <Link to={routes.answer()}>AnswerPage </Link> <br />
            <Link to={routes.notificationTest()}>Notification test </Link>{' '}
            <br />
            <Link to={routes.issues()}>Issues </Link>
          </h2> */}
          <p>Current user: {currentUser?.email}</p>
          <main>{children}</main>
        </div>
        <div className="flex flex-col w-1/6 justify-between items-center">
          <p>Right Sidebar</p>
          <p>Content</p>
          <p>Content</p>
        </div>
      </div>
    </>
  )
}

export default TestLayout
