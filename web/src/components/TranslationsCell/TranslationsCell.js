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
    <>
      <div className="flex flex-col mt-4">
        <div className="text-xl font-semibold  leading-relaxed">Þýðingar</div>
        <ul className="list-decimal pl-8">
          {translations?.map((translation) => {
            return (
              <li key={translation.id} className="italic mt-2">
                {translation.translation}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
