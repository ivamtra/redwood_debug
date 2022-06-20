import { Form, TextField, Submit } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

import TestForm from 'src/components/TestForm'

const FormsPage = () => {
  return (
    <>
      <MetaTags title="Forms" description="Forms page" />
      <h1>FormsPage</h1>
      <TestForm />
    </>
  )
}

export default FormsPage
