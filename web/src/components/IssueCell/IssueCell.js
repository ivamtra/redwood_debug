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
      <div>
        <p>Vandamál nr. {issue.id}</p>
        <p>Hlekkur að vandamáli</p>
        <p>Upplýsingar um vandamál {issue.description}</p>
        <p>Notandi sem senti inn vandamál {issue.user.email}</p>
        <p>Sent {issue.createdAt}</p>
      </div>
    </>
  )
}
