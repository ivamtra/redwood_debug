import { Form, TextField, Submit } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

import AnswerCommentForm from 'src/components/AnswerCommentForm/AnswerCommentForm'
import NewQuestionForm from 'src/components/NewQuestionForm/NewQuestionForm'
import QuestionForm from 'src/components/QuestionForm/QuestionForm'
import TestForm from 'src/components/TestForm'

const FormsPage = () => {
  return (
    <>
      <MetaTags title="Forms" description="Forms page" />
      <h2>---------------------------------------------------</h2>
      <h1>FormsPage</h1>
      <h2>---------------------------------------------------</h2>

      <h1>Prufa fyrir component sem getur tekið inn margar setningar</h1>
      <h4>
        Componentinn er ófullkominn þar sem hann þarf tvo takka með þessari
        útfærslu
      </h4>
      <TestForm />
      <h2>---------------------------------------------------</h2>
      <h1>Question Form</h1>
      <h2>---------------------------------------------------</h2>
      <NewQuestionForm />
      <h2>---------------------------------------------------</h2>
      <h1>Comment form test</h1>
      <AnswerCommentForm parentId={0} answerId={0} />
    </>
  )
}

export default FormsPage
