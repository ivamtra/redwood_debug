export const QUERY = gql`
  query FindCategoryQuery($id: Int!) {
    category: category(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ category }) => {
  return <div>{JSON.stringify(category)}</div>
}
