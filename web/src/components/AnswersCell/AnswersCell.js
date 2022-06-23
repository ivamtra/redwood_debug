import AnswerCell from '../AnswerCell'

export const QUERY = gql`
  query AnswersQuery($questionId: Int!) {
    answers(questionId: $questionId) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div>
    <h4>Engin svör komin</h4>
  </div>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ answers }) => {
  return (
    <div>
      {answers.map((item) => {
        return <AnswerCell id={item.id} key={item.id} />
      })}
    </div>
  )
}
