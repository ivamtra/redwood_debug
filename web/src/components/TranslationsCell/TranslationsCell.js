export const QUERY = gql`
  query TranslationsQuery($answerId: Int!) {
    translations(answerId: $answerId) {
      id
      translation
      answerId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ translations }) => {
  return (
    <ul>
      {translations.map((item) => {
        return (
          <div key={item.id}>
            <p>id = {item.id}</p>
            <p>translation = {item.translation}</p>
            <p>answerId = {item.answerId}</p>
          </div>
        )
      })}
    </ul>
  )
}
