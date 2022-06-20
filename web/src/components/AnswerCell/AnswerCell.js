export const QUERY = gql`
  query FindAnswerQuery($id: Int!) {
    answer: answer(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ answer }) => {
  return <div>{JSON.stringify(answer)}</div>
}
