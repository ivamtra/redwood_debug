import { useEffect } from 'react'

import SentencesCell from '../SentencesCell'

export const QUERY = gql`
  query FindQuestionQuery($id: Int!) {
    question: question(id: $id) {
      id
      title
      language
      definition
      other_info
      userId
      createdAt
      user {
        id
        name
        email
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ question }) => {
  useEffect(() => {
    console.log(question)
  })
  return (
    <div>
      <div>
        {/*TODO: vantar virkni á takka */}
        <button>upvote</button>
        <button>downvote</button>
        <p>Number of upvotes:</p>
        <p>Dagsetning: {question.createdAt}</p>
        <p>User: {question.user.email}</p>
      </div>
      <h1>Titill:{question.title}</h1>
      <div>
        <h3>Tungumál: {question.language}</h3>
        <h3>Aðrar upplýsingar: {question.other_info}</h3>
      </div>
      <h3>Setningar</h3>
      <div>
        <SentencesCell questionId={question.id} />
      </div>
    </div>
  )
}
