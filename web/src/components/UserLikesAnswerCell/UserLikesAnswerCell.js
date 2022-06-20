export const QUERY = gql`
  query FindUserLikesAnswerQuery($id: Int!) {
    userLikesAnswer: userLikesAnswer(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ userLikesAnswer }) => {
  return <div>{JSON.stringify(userLikesAnswer)}</div>
}
