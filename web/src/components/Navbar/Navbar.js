import ReactSearchBox from 'react-search-box'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import logo from '../../../public/pied-piper.png'
import NotificationsCell from '../NotificationsCell/NotificationsCell'

const Navbar = () => {
  const { currentUser, hasRole } = useAuth()
  return (
    <>
      <div className="flex flex-row bg-blue-400 justify-between items-center p-2 font-bold text-md text-slate-100">
        <Link to={routes.questions()}>
          <img id="logo" src={logo} alt="logo" />
        </Link>
        <Link to={routes.forms()}>
          <p>Búa til spurningu</p>
        </Link>
        <div className="w-1/3">
          <ReactSearchBox placeholder="Leita af orði" className="inline" />
        </div>
        <Link to={routes.issues()}>
          <p className={hasRole(['admin', 'moderator']) ? '' : 'hidden'}>
            Issues
          </p>
        </Link>
        <div></div>
      </div>
      <div className="bg-zinc-200 absolute left-[80%] z-10">
        <NotificationsCell userId={currentUser?.id} className="right-4" />
      </div>
    </>
  )
}

export default Navbar
