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
      user {
        id
      }
    }
  }
`

const CREATE_NOTIFICATION = gql`
  mutation CreateTestNotification($input: CreateTestNotificationInput!) {
    createTestNotification(input: $input) {
      id
    }
  }
`

const PARENT_COMMENT_QUERY = gql`
  query FindAnswerCommentQuery($id: Int!) {
    answerComment: answerComment(id: $id) {
      level
      user {
        id
      }
    }
  }
`

const createReplyBody = (userId) => {
  return 'User með id ' + userId + ' svaraði athugasemd þinni'
}

const AnswerCommentForm = ({ parentId, answerId }) => {
  const [hasPosted, setHasPosted] = useState(false)
  const [createNotification] = useMutation(CREATE_NOTIFICATION)
  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      setHasPosted(true)
      toast.success('Thank you for your comment!')
    },
    refetchQueries: [{ query: CommentsQuery, variables: { answerId } }],
  })
  const { isAuthenticated, currentUser, hasRole } = useAuth()
  const [level, setLevel] = useState(0)

  const onSubmit = (data) => {
    if (data.body === '[Deleted]') {
      toast.error('Má ekki 🥺')
      return
    }
    console.log(data.body)
    console.log(currentUser.id)
    console.log(parentId)
    console.log(answerId)

    let inputData = {
      userId: currentUser.id,
      body: data.body,
      parentId: parentId,
      answerId: answerId,
      level: level,
      rating: 0,
    }
    if (currentUser.shadowBanned) {
      inputData = { ...inputData, isHidden: true }
    }

    console.log(inputData)
    createComment({ variables: { input: inputData } }).then((res) => {
      // Comment id sem fer í töfluna
      // Þetta er id-ið á commentinu sem var búið til
      const sendingCommentId = res.data.createAnswerComment.id
      const sendingUserId = res.data.createAnswerComment.user.id

      const recievingUserId = parentData.answerComment.user.id // Id hjá viðtakanda
      const notificationInput = {
        commentId: 0,
        questionId: 0,
        answerId: 0,
        userId: 6,
        body: 'test',
        seen: false,
      }
      console.log(notificationInput)

      console.log(
        createNotification({ variables: { input: notificationInput } })
      )
    })
  }

  const handleLevel = () => {
    const parentLevel = parentData.answerComment.level
    setLevel(parentLevel + 1)
    //parentId: er -1 ef verið er að svara comment
  }

  const {
    data: parentData,
    loading,
    error,
  } = useQuery(PARENT_COMMENT_QUERY, {
    variables: { id: parentId },
  })

  useEffect(() => {
    if (!loading) {
      handleLevel()
    }
  })

  const test = () => {
    console.log(
      createNotification({
        variables: {
          input: {
            userId: 1,
            body: 'Test',
          },
        },
      })
    )
  }

  return (
    <>
      <div>
        <Form onSubmit={onSubmit}>
          <TextAreaField name="body" placeholder="Skrifa athugasemd" />
          <Submit>Save</Submit>
        </Form>
      </div>
      <div>
        <button onClick={test}>Test</button>
      </div>
    </>
  )
}

export default AnswerCommentForm
