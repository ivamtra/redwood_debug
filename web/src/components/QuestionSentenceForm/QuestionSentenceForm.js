import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Submit, Form } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

//TODO: Vantar leið til að sækja þetta id
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
    const finalQuestion = { ...question, userId: currentUser.id }
    console.log(finalQuestion)
    console.log(findMaxId)
    createQUESTION({ variables: { input: finalQuestion } })
    // TODO: Vantar id-ið sem var nýkomið
    // TODO: For lúppa fyrir allar setningarnar
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
