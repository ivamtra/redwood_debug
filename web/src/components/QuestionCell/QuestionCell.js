export const QUERY = gql`
  query FindQuestionQuery($id: Int!) {
    question: question(id: $id) {
      id
      title
      language
      definition
      other_info
      userId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ question }) => {
  return (
    <div>
      <div>
        {/*TODO: vantar virkni á takka */}
        <button>upvote</button>
        <button>downvote</button>
        <p>Number of upvotes:</p>
        <p>Dagsetning: {question.createdAt}</p>
        <p>userId: {question.userId} (breytist seinna)</p>
      </div>
      <h1>{question.title}</h1>
      <h3>Setningar:</h3>
      <h4>Bæta við seinna</h4>
      <div>
        <h3>Tungumál: {question.language}</h3>
        <h3>Aðrar upplýsingar: {question.other_info}</h3>
      </div>
    </div>
  )
}