import IssueCell from '../IssueCell/IssueCell'

export const QUERY = gql`
  query IssuesQuery {
    issues {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ issues }) => {
  return (
    <ul>
      {issues.map((item) => {
        return (
          <div key={item.id} className="mt-11">
            <IssueCell key={item.id} id={item.id} />
          </div>
        )
      })}
    </ul>
  )
}
