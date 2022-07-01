import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Submit, TextAreaField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

const CREATE_COMMENT = gql`
  mutation CreateAnswerComment($input: CreateAnswerCommentInput) {
    createAnswerComment(input: $input) {
      id
    }
  }
`

const AnswerCommentForm = ({ parentId, answerId }) => {
  const [createComment] = useMutation(CREATE_COMMENT)
  const { isAuthenticated, currentUser, logOut } = useAuth()

  const onSubmit = (data) => {
    console.log(data.body)
    console.log(currentUser.id)
    console.log(parentId)
    console.log(answerId)

    const inputData = {
      userId: currentUser.id,
      body: data.body,
      parentId: parentId,
      answerId: answerId,
    }
    console.log(inputData)
    console.log(createComment({ variables: { input: inputData } }))
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <TextAreaField name="body" placeholder="Skrifa athugasemd" />
        <Submit>Save</Submit>
      </Form>
    </div>
  )
}

export default AnswerCommentForm
