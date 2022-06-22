export const QUERY = gql`
  query FindAnswerQuery($id: Int!) {
    answer: answer(id: $id) {
      id
      title
      justification
      userId
      createdAt
      questionId
      translations {
        id
        translation
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ answer }) => {
  return (
    <div>
      <p>answer.id = {answer.id}</p>
      <p>answer.title = {answer.title}</p>
      <p>answer.justification = {answer.justification}</p>
      <p>answer.createdAt = {answer.createdAt}</p>
      <p>answer.questionId = {answer.questionId}</p>
    </div>
  )
}
