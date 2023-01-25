import { useEffect, useMemo } from 'react'

import ReactSearchBox from 'react-search-box'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

import logo from '../../../public/pied-piper-transparent.png'
import NotificationsCell from '../NotificationsCell/NotificationsCell'
import { QUERY as QuestionsQuery } from '../QuestionsCell/QuestionsCell'

const onSelect = (item) => {
  navigate(routes.question({ id: item.item.id }))
}

// Breytir spurningum þannig hægt er að nota searchbar
const mutateQuestionsForSearch = (questions) => {
  console.log(questions)
  if (questions === undefined) return
  let returnList = []
  questions.questions.forEach((item) => {
    const object = { ...item, key: item.id, value: item.title }
    returnList.push(object)
  })
  return returnList
}

const Navbar = () => {
  const { data } = useQuery(QuestionsQuery)
  useEffect(() => console.log(data))
  const searchData = useMemo(() => mutateQuestionsForSearch(data), [data])
  useEffect(() => console.log(searchData), [data, searchData])
  const { currentUser, hasRole, isAuthenticated, logOut } = useAuth()
  return (
    <>
      <div className="flex flex-row bg-blar justify-around items-center font-bold text-md text-slate-100 font-body shadow-lg shadow-white p-2 ">
        <div className="bg-white rounded-xl p-1 w-12 relative left-2 ">
          <Link to={routes.questions()}>
            <img id="logo" src={logo} alt="logo" />
          </Link>
        </div>
        <Link to={routes.forms()}>
          <p>Búa til spurningu</p>
        </Link>
        <div className="w-1/3"></div> {/*Býr til pláss fyrir seachbar */}
        <div className="w-1/3 absolute left-[33%]  z-10">
          <ReactSearchBox
            placeholder="Leita af orði"
            className="inline"
            data={searchData}
            onSelect={onSelect}
          />
        </div>
        <Link to={routes.issues()}>
          <p className={hasRole(['admin', 'moderator']) ? '' : 'hidden'}>
            Issues
          </p>
        </Link>
        {/* Notifications ættu að koma hér */}
        <NotificationsCell userId={currentUser?.id} />
        {/* Login/Signup eða Log out */}
        <div className="relative inline right-2">
          {isAuthenticated ? (
            <div className="cursor-pointer">
              <p onClick={logOut}>Log out</p>
            </div>
          ) : (
            <div className="flex flex-col justify-items-stretch items-end">
              <Link to={routes.login()}>
                <p>Log In</p>
              </Link>
              <Link to={routes.signup()}>
                <p className="mt-2">Sign up</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
