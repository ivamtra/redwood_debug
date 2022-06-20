export const QUERY = gql`
  query FindUserLikesCommentQuery($id: Int!) {
    userLikesComment: userLikesComment(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ userLikesComment }) => {
  return <div>{JSON.stringify(userLikesComment)}</div>
}
