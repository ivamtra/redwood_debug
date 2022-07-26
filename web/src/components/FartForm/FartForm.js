import { Form, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

const CREATE_FART = gql`
  mutation CreateFartMutation($input: CreateFartInput!) {
    createFart(input: $input) {
      id
    }
  }
`

const FartForm = () => {
  const [createFart] = useMutation(CREATE_FART)
  const onFart = () => {
    const input = {
      body: 'fart',
      isSeen: false,
      userId: 0,
      questionId: 0,
      answerId: 0,
      answerCommentId: 0,
    }
    createFart({ variables: { input: input } })
  }
  return (
    <div>
      <button onClick={onFart}>Fart</button>
    </div>
  )
}

export default FartForm
