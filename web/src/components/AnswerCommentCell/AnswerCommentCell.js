export const QUERY = gql`
  query FindAnswerCommentQuery($id: Int!) {
    answerComment: answerComment(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ answerComment }) => {
  return <div>{JSON.stringify(answerComment)}</div>
}
