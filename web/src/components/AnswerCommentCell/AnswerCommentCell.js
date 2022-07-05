import FlagButton from '../FlagButton/FlagButton'
import RatingButton from '../RatingButton/RatingButton'
import ReplyButton from '../ReplyButton/ReplyButton'

export const QUERY = gql`
  query FindAnswerCommentQuery($id: Int!) {
    answerComment: answerComment(id: $id) {
      id
      answerId
      user {
        email
      }
      body
      createdAt
      parentId
      level
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
      <h2>{answerComment.body}</h2>
      <RatingButton type={'comment'} id={answerComment.id} />
      <FlagButton type={'comment'} id={answerComment.id} />
      <ReplyButton
        parentId={answerComment.id}
        answerId={answerComment.answerId}
      />
      <p>Rating:</p>
      <p>answerId = {answerComment.answerId}</p>
      <p>id = {answerComment.id}</p>
      <p>{answerComment.createdAt}</p>
      <p>{answerComment.user.email}</p>
      <p>parentId: {answerComment.parentId}</p>
      <p>level: {answerComment.level}</p>
    </div>
  )
}
