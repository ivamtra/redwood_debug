import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Submit, Form } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
//TODO: Create mutation
//TODO: Vantar leið til að fá user id

const CREATE_QUESTION = gql`
  mutation CreateQuestionMutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
    }
  }
`

const CREATE_SENTENCE = gql`
  mutation CreateSentenceMutation($input: CreateSentenceInput!) {
    createSentence(input: $input) {
      id
    }
  }
`

const QuestionSentenceForm = ({ question, sentences }) => {
  const [createQUESTION] = useMutation(CREATE_QUESTION)
  const [createSENTENCE] = useMutation(CREATE_SENTENCE)
  const { isAuthenticated, currentUser, logOut } = useAuth()

  const onFinished = () => {
    let finalQuestion = { ...question, userId: currentUser.id }
    console.log(finalQuestion)
    createQUESTION({ variables: { input: finalQuestion } })
  }

  return (
    <div>
      <p>Í Child component</p>
      <button
        onClick={() => {
          console.log(question)
        }}
      >
        log question
      </button>
      <button onClick={() => console.log(sentences)}>log sentences</button>{' '}
      <br />
      <button onClick={onFinished}>Senda í gagnagrunn</button>
      <p>Question component</p>
    </div>
  )
}

export default QuestionSentenceForm
