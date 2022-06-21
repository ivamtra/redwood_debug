import { useState, useEffect } from 'react'

import { TextField, Form, Submit } from '@redwoodjs/forms'

import TestForm from '../TestForm/TestForm'
//TODO: Sækja gögn úr SentenceForm

//TODO: Vantar leið til að sækja id
// Líklega hægt að sækja max(id) úr gagnagrunni en það gæti verið hægt
let QUESTION

// Gögn flæða úr questionForm yfir í sentenceForm sem fara síðan í gagnagrunninn
const QuestionForm = () => {
  const onSubmit = (data) => {
    //console.log(data)
    QUESTION = data
    console.log(QUESTION)
  }
  const [ques, setQues] = useState({})

  const onSave = () => {
    setQues(QUESTION)
    console.log(ques)
  }

  return (
    <Form onSubmit={onSubmit}>
      <div>
        <TextField placeholder="title" name="title" /> <br />
        <TextField placeholder="language" name="language" /> <br />
        <TextField placeholder="definition" name="definition" /> <br />
        <TextField placeholder="other_info" name="other_info" /> <br />
      </div>
      <TestForm question={ques} />
      <button onClick={onSave}>Save question</button>
    </Form>
  )
}

export default QuestionForm
