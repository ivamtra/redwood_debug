export const QUERY = gql`
  query FindQuestionIsInCategoryQuery($id: Int!) {
    questionIsInCategory: questionIsInCategory(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ questionIsInCategory }) => {
  return <div>{JSON.stringify(questionIsInCategory)}</div>
}
