import FlagButton from '../FlagButton/FlagButton'
import RatingButton from '../RatingButton/RatingButton'

export const QUERY = gql`
  query FindAnswerCommentQuery($id: Int!) {
    answerComment: answerComment(id: $id) {
      id
      user {
        email
      }
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ answerComment }) => {
  return (
    <div>
      <RatingButton type={'comment'} id={answerComment.id} />
      <FlagButton type={'comment'} id={answerComment.id} />
      <p>{answerComment.createdAt}</p>
      <p>{answerComment.user.email}</p>
      <h2>{answerComment.body}</h2>
    </div>
  )
}
