import { Form, TextField, Submit } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

const FormsPage = () => {
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <MetaTags title="Forms" description="Forms page" />

      <h1>FormsPage</h1>

      <Form onSubmit={onSubmit}>
        <TextField name="input" />
        <Submit>Save</Submit>
      </Form>
    </>
  )
}

export default FormsPage
