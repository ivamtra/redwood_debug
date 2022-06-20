import { Form, TextField } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const FormsPage = () => {
  return (
    <>
      <MetaTags title="Forms" description="Forms page" />

      <h1>FormsPage</h1>

      <Form>
        <TextField name="input" />
      </Form>
    </>
  )
}

export default FormsPage
