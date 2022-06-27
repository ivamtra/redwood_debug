import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Submit, Form, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
const CREATE_QUESTION = gql`
  mutation CreateQuestionMutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
      createdAt
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

const NewQuestionForm = () => {
  const [createQuestion] = useMutation(CREATE_QUESTION)
  const [createSentence] = useMutation(CREATE_SENTENCE)
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [textValue, setTextValue] = useState('')

  const [list, setList] = useState([
    { listIndex: 0, sentence: 'placeholder', questionId: 0 },
  ])
  const [listIndex, setListIndex] = useState(0)

  const addSentence = () => {}

  const onSubmit = (questionData) => {
    handleQuestionMutation(questionData)
    handleSentenceMutation()
  }

  const handleSentenceMutation = (sentenceList) => {}

  const handleQuestionMutation = (data) => {
    console.log(data)
    const inputData = { ...data, userId: currentUser.id }
    const questionCreatedPromise = createQuestion({
      variables: {
        input: inputData,
      },
    })
    console.log(questionCreatedPromise)
  }
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <TextField placeholder="title" name="title" required /> <br />
        <TextField placeholder="language" name="language" required /> <br />
        <TextField placeholder="definition" name="definition" required /> <br />
        <TextField placeholder="other_info" name="other_info" required /> <br />
        <div>
          {list.map((item) => (
            <div key={item.listIndex}>
              <input
                placeholder={'sentence ' + listIndex}
                name={item.listIndex}
              />
              <button onClick={addSentence}>+</button>
            </div>
          ))}
        </div>
        <Submit>Submit</Submit>
      </Form>
    </div>
  )
}

export default NewQuestionForm
