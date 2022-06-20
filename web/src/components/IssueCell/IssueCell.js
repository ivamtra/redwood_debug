export const QUERY = gql`
  query FindIssueQuery($id: Int!) {
    issue: issue(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ issue }) => {
  return <div>{JSON.stringify(issue)}</div>
}
