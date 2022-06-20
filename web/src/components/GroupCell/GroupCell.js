export const QUERY = gql`
  query FindGroupQuery($id: Int!) {
    group: group(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ group }) => {
  return <div>{JSON.stringify(group)}</div>
}
