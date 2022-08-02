import { useEffect } from 'react'

import QuestionCell from '../QuestionCell/QuestionCell'

export const QUERY = gql`
  query QuestionsQuery {
    questions {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ questions }) => {
  return (
    <ul>
      {questions.map((item) => {
        return (
          <div key={item.id} className="mt-11">
            <QuestionCell inQuestionsCell={true} key={item.id} id={item.id} />
          </div>
        )
      })}
    </ul>
  )
}
