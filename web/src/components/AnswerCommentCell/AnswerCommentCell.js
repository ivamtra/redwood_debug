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
      parentId
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
      <h1>----------------------------------</h1>
      <RatingButton type={'comment'} id={answerComment.id} />
      <FlagButton type={'comment'} id={answerComment.id} />
      <p>Rating:</p>
      <p>id = {answerComment.id}</p>
      <p>{answerComment.createdAt}</p>
      <p>{answerComment.user.email}</p>
      <p>parentId: {answerComment.parentId}</p>
      <h2>{answerComment.body}</h2>
    </div>
  )
}
