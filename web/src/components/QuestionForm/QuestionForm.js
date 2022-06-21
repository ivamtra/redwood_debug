import { TextField, Form } from '@redwoodjs/forms'

import TestForm from '../TestForm/TestForm'

const QuestionForm = () => {
  return (
    <Form>
      <div>
        <TextField placeholder="title" name="title" /> <br />
        <TextField placeholder="language" name="language" /> <br />
        <TextField placeholder="definition" name="definition" /> <br />
        <TextField placeholder="other_info" name="other_info" /> <br />
        <TestForm />
      </div>
    </Form>
  )
}

export default QuestionForm
