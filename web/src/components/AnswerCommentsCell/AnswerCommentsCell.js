import AnswerCommentCell from '../AnswerCommentCell'

export const QUERY = gql`
  query AnswerCommentsQuery {
    answerComments {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ answerComments }) => {
  return (
    <div>
      {answerComments.map((item) => {
        return <AnswerCommentCell key={item.id} id={item.id} />
      })}
    </div>
  )
}
