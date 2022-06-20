export const QUERY = gql`
  query FindUserHasBadgeQuery($id: Int!) {
    userHasBadge: userHasBadge(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ userHasBadge }) => {
  return <div>{JSON.stringify(userHasBadge)}</div>
}
