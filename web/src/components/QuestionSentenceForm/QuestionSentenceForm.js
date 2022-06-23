import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Submit, Form } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

// Virkar að query-a, það vantar bara einhverja leið til að fá
// Max-id query-ið til að virka
export const QUERY = gql`
  query FindMaxIdQuery {
    questions {
      id
      title
      language
      definition
      other_info
      userId
      createdAt
    }
  }
`

var QUESTIONCREATED_ID

//TODO: Vantar leið til að sækja þetta id
const CREATE_QUESTION = gql`
  mutation CreateQuestionMutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
    }
  }
`
// => Sem fer í þetta statement
const CREATE_SENTENCE = gql`
  mutation CreateSentenceMutation($input: CreateSentenceInput!) {
    createSentence(input: $input) {
      id
    }
  }
`

const QuestionSentenceForm = ({ question, sentences, questions }) => {
  const [createQUESTION] = useMutation(CREATE_QUESTION)
  const [createSENTENCE] = useMutation(CREATE_SENTENCE)
  const { isAuthenticated, currentUser, logOut } = useAuth()

  const onFinished = () => {
    const finalQuestion = { ...question, userId: currentUser.id }
    console.log(finalQuestion)
    let questionCreatedPromise = createQUESTION({
      variables: { input: finalQuestion },
    })

    console.log(questionCreatedPromise)
    // TODO: Vantar id-ið sem var nýkomið
    let promise2 = questionCreatedPromise.then((result) => {
      console.log(result.data.createQuestion.id)
      QUESTIONCREATED_ID = result.data.createQuestion.id
      console.log(QUESTIONCREATED_ID)
    })
    // TODO: For lúppa fyrir allar setningarnar
    console.log(sentences)
    sentences.forEach((sentence) => {
      console.log(createSENTENCE({ variables: { input: sentence } }))
    })
  }
  useEffect(() => {
    // questions.forEach((item) => console.log(item))
    console.log(QUESTIONCREATED_ID)
  })

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
