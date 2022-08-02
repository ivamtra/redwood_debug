import { Form, TextField, Submit } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

import AnswerCommentForm from 'src/components/AnswerCommentForm/AnswerCommentForm'
import AnswerForm from 'src/components/AnswerForm/AnswerForm'
import NewQuestionForm from 'src/components/NewQuestionForm/NewQuestionForm'
import QuestionForm from 'src/components/QuestionForm/QuestionForm'
import TestForm from 'src/components/TestForm'

//TODO: Uncommenta þegar gagnagrunnur er kominn í lag
const FormsPage = () => {
  return (
    <>
      <MetaTags title="Forms" description="Forms page" />
      <h2>---------------------------------------------------</h2>
      <h1>FormsPage</h1>
      <h1>Verður líklega síða til að búa til nýjar spurningar</h1>

      <h2>---------------------------------------------------</h2>
      <h1>Question Form</h1>
      <h2>---------------------------------------------------</h2>
      <NewQuestionForm />
    </>
  )
}

export default FormsPage
