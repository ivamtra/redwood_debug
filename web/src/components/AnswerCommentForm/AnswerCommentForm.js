//TODO: Vantar refetch queries þegar maður commentar

import { useEffect, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Submit, TextAreaField } from '@redwoodjs/forms'
import { useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { QUERY as CommentsQuery } from 'src/components/AnswerCommentsCell/AnswerCommentsCell'

//TODO vantar að laga question hér
export const CREATE_COMMENT = gql`
  mutation CreateAnswerComment($input: CreateAnswerCommentInput!) {
    createAnswerComment(input: $input) {
      id
      user {
        id
      }
      answer {
        userId #reciever
        questionId
      }
      level
      answerId
      questionId
      question {
        userId
      }
    }
  }
`

export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($input: CreateNotificationInput!) {
    createNotification(input: $input) {
      id
      body
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

const createReplyBody = (userId, questionId, level) => {
  // Athugasemd við svar eða spurning
  if (level === 1) {
    // Athugasemd við svar
    if (questionId === 0) {
      return 'User með id ' + userId + ' gerði athugasemd við svar þitt'
    }
    // Athugasemd við spurningu
    else {
      return 'User með id ' + userId + ' gerði athugasemd við spurningu þína'
    }
  }
  return 'User með id ' + userId + ' svaraði athugasemd þinni'
}

const handleRecievingUserId = (level) => {
  if (level === 1) {
    // Hér er gerð athugasemd við spurningu
  } else {
    // Hér er gerð athugasemd við svar
  }
}

const AnswerCommentForm = ({ parentId, answerId, questionId }) => {
  useEffect(() => {
    console.log(paramQuestionId)

    if (!loading) {
      handleLevel()
    }
  })
  const { id: paramQuestionId } = useParams()
  const [hasPosted, setHasPosted] = useState(false)
  const [createNotification] = useMutation(CREATE_NOTIFICATION)
  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      setHasPosted(true)
      toast.success('Thank you for your comment!')
    },
    refetchQueries: [
      { query: CommentsQuery, variables: { answerId, questionId } },
    ],
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
    console.log(questionId)

    let inputData = {
      userId: currentUser.id,
      body: data.body,
      parentId: parentId,
      answerId: answerId,
      level: level,
      rating: 0,
      questionId: questionId,
    }
    if (currentUser.shadowBanned) {
      inputData = { ...inputData, isHidden: true }
    }

    console.log(inputData)
    createComment({ variables: { input: inputData } }).then((res) => {
      console.log(res)
      // Comment id sem fer í töfluna
      // Þetta er id-ið á commentinu sem var búið til
      const sendingCommentId = res.data.createAnswerComment.id
      const sendingUserId = res.data.createAnswerComment.user.id // Fer í skilaboðin

      // Hversu djúpt nestað commentið er
      const level = res.data.createAnswerComment.level

      let recievingUserId
      // Hérna er verið að svara athugasemd
      if (level !== 1) {
        recievingUserId = parentData.answerComment.user.id // Id hjá viðtakanda
      }
      // Hérna er verið að gera athugasemd við spurningu eða svar
      else {
        if (questionId === 0)
          recievingUserId = res.data.createAnswerComment.answer.userId
        else recievingUserId = res.data.createAnswerComment.question.userId
      }

      // Viljum ekki búa til notification ef verið er að svara sjálfum sér
      if (recievingUserId === sendingUserId) {
        return
      }

      console.log(recievingUserId)

      const notificationQuestionId =
        res.data.createAnswerComment.answer.questionId
      const body = createReplyBody(sendingUserId, questionId, level)
      let notificationInput = {
        body: body,
        isSeen: false,
        userId: recievingUserId,
        answerId: 0,
        answerCommentId: sendingCommentId,
        questionId: paramQuestionId,
      }

      // // Comment á svar
      // if (res.data.createAnswerComment.level === 1) {
      //   notificationInput.userId = res.data.createAnswerComment.answer.userId
      //   notificationInput.body = createReplyBody(sendingUserId, true)
      // }
      console.log(recievingUserId)
      console.log(sendingUserId)

      console.log(notificationInput)
      // Notandi sem svarar sér sjálfum á ekki að fá notification
      if (recievingUserId !== sendingUserId) {
        console.log(
          createNotification({ variables: { input: notificationInput } })
        )
      }
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

  return (
    <>
      <div>
        <Form onSubmit={onSubmit}>
          <TextAreaField name="body" placeholder="Skrifa athugasemd" />
          <Submit>Save</Submit>
        </Form>
      </div>
    </>
  )
}

export default AnswerCommentForm
