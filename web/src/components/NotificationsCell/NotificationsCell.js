import { useEffect, useLayoutEffect, useState } from 'react'

import { IoNotifications } from 'react-icons/io5'

import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'

import { UPDATE_NOTIFICATION } from 'src/customUtils/GraphQLMutations'

import NotificationCell from '../NotificationCell/NotificationCell'
export const QUERY = gql`
  query FindNotificationsQuery($userId: Int!) {
    notifications(userId: $userId) {
      id
      isSeen
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div>
    <IoNotifications className="text-[#ffd700] border-slate-500 w-8 h-8 inline cursor-pointer" />
  </div>
)

export const Failure = ({ error }) => {
  const { isAuthenticated } = useAuth()
  useEffect(() => console.log(isAuthenticated))
  return (
    <div className={isAuthenticated ? '' : 'hidden'} style={{ color: 'red' }}>
      Error: {error.message}
    </div>
  )
}

export const Success = ({ notifications }) => {
  // Refetcha ekki því ég vil að notandi geti séð
  // hvaða comment eru ekki seen áður en hann refreshar
  const [updateNotification] = useMutation(UPDATE_NOTIFICATION)
  const [numberOfUnseen, setNumberOfUnseen] = useState(0)
  // ! Breyta í true þegar búið er að debugga
  const [isBellClicked, setIsBellClicked] = useState(true)

  const handleBell = () => setIsBellClicked(!isBellClicked)
  useLayoutEffect(() => {
    let counter = 0
    notifications.forEach((element) => {
      // console.log(element)
      if (!element.isSeen) {
        counter++
        // updateNotification({
        //   variables: { id: element.id, input: { isSeen: true } },
        // })
      }
    })
    setNumberOfUnseen(counter)
    console.log(counter)
  }, [notifications, updateNotification])
  return (
    <>
      {/* Bell notification */}
      <div className="p-4 ">
        <IoNotifications
          onClick={handleBell}
          className="text-[#ffd700] border-slate-500 w-8 h-8 inline cursor-pointer"
        />
        <span
          className={
            numberOfUnseen === 0
              ? 'hidden'
              : 'bg-red-500 rounded-full pl-[5px] pr-[5px] text-zinc-100 relative right-3 bottom-2 '
          }
        >
          <p className="text-xs inline">
            {numberOfUnseen === 0 ? '' : numberOfUnseen}
          </p>
        </span>
      </div>
      {/* Upplýsingarnar */}
      <div
        className={
          isBellClicked
            ? 'hidden'
            : 'max-h-[300px] max-w-xs overflow-auto absolute right-[270px] top-[100px]'
        }
      >
        <ul>
          {notifications.map((item) => {
            return <NotificationCell id={item.id} key={item.id} />
          })}
        </ul>
      </div>
    </>
  )
}
