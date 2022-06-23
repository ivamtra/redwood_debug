export const QUERY = gql`
  query AnswersQuery($questionId: Int!) {
    answers(questionId: $questionId) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ answers }) => {
  return (
    <ul>
      {answers.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
