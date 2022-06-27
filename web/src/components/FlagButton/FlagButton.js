/* eslint-disable no-case-declarations */
import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Submit, TextAreaField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
// type : {
//   question
//   answer
//   comment
// }

const CREATE_ISSUE = gql`
  mutation CreateIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      id
    }
  }
`

const FlagButton = ({ type, id }) => {
  const [isClicked, setIsClicked] = useState(false)
  const onSubmit = (data) => {
    console.log(data)
    const newData = {
      ...data,
      userId: currentUser.id,
      questionId: 0,
      answerId: 0,
      answerCommentId: 0,
    }
    handleMutation(newData)
  }
  const [createIssue] = useMutation(CREATE_ISSUE)

  const handleFlag = () => {
    setIsClicked(!isClicked)
  }

  const handleMutation = (data) => {
    switch (type) {
      case 'answer':
        data.answerId = id
        console.log(data)
        console.log(createIssue({ variables: { input: data } }))
        break
      case 'question':
        data.questionId = id
        console.log(data)
        console.log(createIssue({ variables: { input: data } }))
        break
      case 'comment':
        const commentInput = { ...data, answerCommentId: id }
        console.log(commentInput)
        break
      default:
        // Throw exception
        console.log('invalid type')
        break
    }
  }
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <div>
      <button onClick={handleFlag}>Flag</button>
      {isClicked ? (
        <div>
          <Form onSubmit={onSubmit}>
            <TextAreaField name="description" />
            <Submit>Save</Submit>
          </Form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default FlagButton
