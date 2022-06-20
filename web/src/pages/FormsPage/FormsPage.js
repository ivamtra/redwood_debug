import { Form, TextField, Submit } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const FormsPage = () => {
  return (
    <>
      <MetaTags title="Forms" description="Forms page" />

      <h1>FormsPage</h1>

      <Form>
        <TextField name="input" />
        <Submit>Save</Submit>
      </Form>
    </>
  )
}

export default FormsPage
