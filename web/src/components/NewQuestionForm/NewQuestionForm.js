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
  const [list, setList] = useState([
    { listIndex: 0, sentence: 'placeholder', questionId: 0 },
  ])
  const [listIndex, setListIndex] = useState(0)

  const onSubmit = (data) => console.log(data)
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <TextField placeholder="title" name="title" /> <br />
        <TextField placeholder="language" name="language" /> <br />
        <TextField placeholder="definition" name="definition" /> <br />
        <TextField placeholder="other_info" name="other_info" /> <br />
        <div>
          {list.map((item) => (
            <div key={item.listIndex}>
              <input
                placeholder={'sentence ' + listIndex}
                name={item.listIndex}
              />
            </div>
          ))}
        </div>
        <Submit>Submit</Submit>
      </Form>
    </div>
  )
}

export default NewQuestionForm
