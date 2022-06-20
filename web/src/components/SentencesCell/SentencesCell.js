export const QUERY = gql`
  query SentencesQuery {
    sentences {
      id
      sentence
      questionId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ sentences }) => {
  return (
    <>
      {sentences.map((item) => {
        return (
          <div className="bg-gray-400" key={item.id}>
            <h3>id = {item.id}</h3>
            <h3>sentence = {item.sentence}</h3>
            <h3>questionId = {item.questionId}</h3>
          </div>
        )
      })}
    </>
  )
}
