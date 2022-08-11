import { useEffect, useMemo } from 'react'

import ReactSearchBox from 'react-search-box'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

import logo from '../../../public/pied-piper.png'
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
  const { currentUser, hasRole, isAuthenticated } = useAuth()
  return (
    <>
      <div className="flex flex-row bg-blue-400 justify-between items-center p-2 font-bold text-md text-slate-100">
        <Link to={routes.questions()}>
          <img id="logo" src={logo} alt="logo" />
        </Link>
        <Link to={routes.forms()}>
          <p>Búa til spurningu</p>
        </Link>
        <div className="w-1/3 relative">
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
        {/* Login/Signup eða Log out */}
        <div className="relative inline">
          {isAuthenticated ? (
            <div>Log out</div>
          ) : (
            <div>
              <p>Log In</p>
              <p>Sign up</p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-zinc-200 absolute left-[80%] z-10">
        <NotificationsCell userId={currentUser?.id} className="right-4" />
      </div>
    </>
  )
}

export default Navbar
