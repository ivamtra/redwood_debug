import UserCellStories from '../UserCell/UserCell.stories'

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
      <p>{answerComment.createdAt}</p>
      <p>{answerComment.user.email}</p>
      <h2>{answerComment.body}</h2>
    </div>
  )
}
