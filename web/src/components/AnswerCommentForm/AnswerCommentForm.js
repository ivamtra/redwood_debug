//TODO: Vantar refetch queries þegar maður commentar

import { useEffect, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Submit, TextAreaField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { QUERY as CommentsQuery } from 'src/components/AnswerCommentsCell/AnswerCommentsCell'

export const CREATE_COMMENT = gql`
  mutation CreateAnswerComment($input: CreateAnswerCommentInput!) {
    createAnswerComment(input: $input) {
      id
    }
  }
`

const PARENT_COMMENT_QUERY = gql`
  query FindAnswerCommentQuery($id: Int!) {
    answerComment: answerComment(id: $id) {
      level
    }
  }
`

const AnswerCommentForm = ({ parentId, answerId }) => {
  const [hasPosted, setHasPosted] = useState(false)
  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      setHasPosted(true)
      toast.success('Thank you for your comment!')
    },
    refetchQueries: [{ query: CommentsQuery, variables: { answerId } }],
  })
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [level, setLevel] = useState(0)

  const onSubmit = (data) => {
    if (data.body === '[Deleted]') {
      toast.error('Má ekki :(')
      return
    }
    console.log(data.body)
    console.log(currentUser.id)
    console.log(parentId)
    console.log(answerId)

    const inputData = {
      userId: currentUser.id,
      body: data.body,
      parentId: parentId,
      answerId: answerId,
      level: level,
      rating: 0,
    }

    console.log(inputData)
    console.log(createComment({ variables: { input: inputData } }))
  }

  const handleLevel = () => {
    const parentLevel = data.answerComment.level
    setLevel(parentLevel + 1)
    //parentId: er -1 ef verið er að svara comment
  }

  const { data, loading, error } = useQuery(PARENT_COMMENT_QUERY, {
    variables: { id: parentId },
  })

  useEffect(() => {
    if (!loading) {
      handleLevel()
    }
  })

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
