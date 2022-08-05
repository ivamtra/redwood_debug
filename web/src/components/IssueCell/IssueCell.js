import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query FindIssueQuery($id: Int!) {
    issue: issue(id: $id) {
      id
      user {
        id
        email
        name
      }
      questionId
      answerId
      answerCommentId
      description
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ issue }) => {
  return (
    <>
      <div className="flex-grow max-w-xl shadow-lg p-4 rounded-lg bg-white text-slate-500">
        <div className="flex flex-col">
          <p>Vandamál nr. {issue.id}</p>
          <p>
            {' '}
            <Link
              to={routes.question({
                id: issue.questionId,
                answerId: issue.answerId,
                commentId: issue.answerCommentId,
              })}
            >
              Hlekkur að vandamáli
            </Link>
          </p>
          <p>Upplýsingar um vandamál {issue.description}</p>
          <p>Notandi sem senti inn vandamál {issue.user.email}</p>
          <p>Sent {issue.createdAt}</p>
        </div>
      </div>
    </>
  )
}
