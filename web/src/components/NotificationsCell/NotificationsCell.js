import NotificationCell from '../NotificationCell/NotificationCell'

export const QUERY = gql`
  query FindNotificationsQuery2 {
    notifications {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ notifications }) => {
  return (
    <>
      <div>
        <ul>
          {notifications.map((item) => {
            return <NotificationCell id={item.id} key={item.id} />
          })}
        </ul>
      </div>
    </>
  )
}
