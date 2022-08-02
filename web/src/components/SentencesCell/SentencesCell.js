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
      <div className="flex flex-col mt-4">
        <div className="text-xl font-semibold  leading-relaxed">
          Example sentences using the word
        </div>
        <ul className="list-decimal pl-8">
          {sentences?.map((sentence) => {
            return (
              <li key={sentence.id} className="italic mt-2">
                {sentence.sentence}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
