import FlagButton from '../FlagButton/FlagButton'
import RatingButton from '../RatingButton/RatingButton'

export const QUERY = gql`
  query FindAnswerQuery($id: Int!) {
    answer: answer(id: $id) {
      id
      title
      justification
      userId
      user {
        email
      }
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

export const Empty = () => <div>Engin svör komin</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ answer }) => {
  return (
    <div>
      <div>
        {/*TODO: vantar virkni á takka */}
        {/* <button>upvote</button>
        <button>downvote</button> */}
        <RatingButton id={answer.id} type={'answer'} />
        <FlagButton id={answer.id} type={'answer'} />
        <p>answer.id = {answer.id}</p>
        <p>Rating:</p>
        <p>Dagsetning: {answer.createdAt}</p>
        <h4>User: {answer.user.email}</h4>
      </div>
      <div>
        <h2>Titill: {answer.title} (Getur verið ekkert)</h2>
        <h3>Rökstuðningur: {answer.justification}</h3>
        <p>answer.questionId = {answer.questionId}</p>
      </div>
    </div>
  )
}
