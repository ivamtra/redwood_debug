export const QUERY = gql`
  query FindNotificationFormQuery($id: Int!) {
    notificationForm: notificationForm(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ notificationForm }) => {
  return <div>{JSON.stringify(notificationForm)}</div>
}
