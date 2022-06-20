export const QUERY = gql`
  query FindCommentQuery($id: Int!) {
    comment: comment(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ comment }) => {
  return <div>{JSON.stringify(comment)}</div>
}
