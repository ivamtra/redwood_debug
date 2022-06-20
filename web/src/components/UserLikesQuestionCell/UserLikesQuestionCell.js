export const QUERY = gql`
  query FindUserLikesQuestionQuery($id: Int!) {
    userLikesQuestion: userLikesQuestion(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ userLikesQuestion }) => {
  return <div>{JSON.stringify(userLikesQuestion)}</div>
}
