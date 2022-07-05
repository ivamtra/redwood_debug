import AnswerCommentForm from '../AnswerCommentForm/AnswerCommentForm'
import AnswerCommentsCell from '../AnswerCommentsCell/AnswerCommentsCell'
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
      <AnswerCommentForm answerId={answer.id} parentId={0} />
      <AnswerCommentsCell answerId={answer.id} />
    </div>
  )
}
