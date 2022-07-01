import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Submit, TextAreaField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'

const CREATE_COMMENT = gql`
  mutation CreateAnswerComment($input: CreateAnswerCommentInput!) {
    createAnswerComment(input: $input) {
      id
    }
  }
`

const PARENT_COMMENT_QUERY = gql`
  query FindAnswerCommentQuery($id: Int!) {
    answerComment: answrComment(id: $id) {
      level
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
      level: 0,
    }

    const testData = {
      body: 'test',
      userId: 0,
      parentId: 0,
      answerId: 0,
      level: 0,
    }
    console.log(inputData)
    console.log(testData)
    console.log(createComment({ variables: { input: testData } }))
  }

  const handleLevel = () => {
    //parentId: er -1 ef verið er að svara comment
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
