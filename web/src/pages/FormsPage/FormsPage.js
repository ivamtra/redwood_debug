import { Form, TextField, Submit } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

import TestForm from 'src/components/TestForm'

const FormsPage = () => {
  return (
    <>
      <MetaTags title="Forms" description="Forms page" />
      <h1>FormsPage</h1>
      <h2>---------------------------------------------------</h2>

      <h1>Prufa fyrir component sem getur tekið inn margar setningar</h1>
      <h4>
        Componentinn er ófullkominn þar sem hann þarf tvo takka með þessari
        útfærslu
      </h4>
      <TestForm />
      <h2>---------------------------------------------------</h2>
    </>
  )
}

export default FormsPage
