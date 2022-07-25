import { Form, Submit, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($input: CreateTestNotificationInput!) {
    createTestNotification(input: $input) {
      id
    }
  }
`

const NotificationForm = () => {
  const [createNotification] = useMutation(CREATE_NOTIFICATION)
  const onSubmit = (data) => {
    console.log(data)
    data.userId = parseInt(data.userId)
    data.seen = data.seen === 'true'
    createNotification({ variables: { input: data } }).catch((err) => {
      console.error(err)
      console.log('In catch')
    })
  }
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <TextField name="userId" placeholder="userId" />
        <TextField name="body" placeholder="body" />
        <TextField name="seen" placeholder="seen" />
        <Submit>Submit</Submit>
      </Form>
    </div>
  )
}

export default NotificationForm
