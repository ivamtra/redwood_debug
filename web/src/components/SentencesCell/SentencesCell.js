export const QUERY = gql`
  query SentencesQuery($questionId: Int!) {
    sentences(questionId: $questionId) {
      id
      sentence
      questionId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div>
    <h4>Engar setningar, mun vera required seinna</h4>
  </div>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ sentences }) => {
  return (
    <>
      {sentences.map((item) => {
        return (
          <div key={item.id}>
            <p>id = {item.id}</p>
            <p>sentence = {item.sentence}</p>
            <p>questionId = {item.questionId}</p>
          </div>
        )
      })}
    </>
  )
}
