import { useEffect, useLayoutEffect, useState } from 'react'

import { IoNotifications } from 'react-icons/io5'

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

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ notifications }) => {
  const [numberOfUnseen, setNumberOfUnseen] = useState(0)
  useLayoutEffect(() => {
    let counter = 0
    notifications.forEach((element) => {
      console.log(element)
      if (!element.isSeen) {
        counter++
      }
    })
    setNumberOfUnseen(counter)
    console.log(counter)
  }, [notifications])
  return (
    <>
      {/* Bell notification */}
      <div className="p-4">
        <IoNotifications className="text-[#ffd700] border-slate-500 w-8 h-8 inline" />
        <span className="bg-red-500 rounded-full p-[1px] text-zinc-100">
          {numberOfUnseen}
        </span>
      </div>
      {/* Upplýsingarnar */}
      <div className="">
        <ul>
          {notifications.map((item) => {
            return <NotificationCell id={item.id} key={item.id} />
          })}
        </ul>
      </div>
    </>
  )
}
