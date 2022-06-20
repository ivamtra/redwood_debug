export const QUERY = gql`
  query FindBadgeQuery($id: Int!) {
    badge: badge(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ badge }) => {
  return <div>{JSON.stringify(badge)}</div>
}
