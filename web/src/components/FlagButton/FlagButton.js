/* eslint-disable no-case-declarations */
import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Submit, TextAreaField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
// type : {
//   question
//   answer
//   comment
// }

const CREATE_ISSUE = gql`
  mutation CreateIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      id
      questionId
      answer {
        questionId
      }
      answerComment {
        questionId
        answer {
          questionId
        }
      }
    }
  }
`

const UPDATE_ISSUE = gql`
  mutation UpdateIssue($input: UpdateIssueInput!, $id: Int!) {
    updateIssue(input: $input, id: $id) {
      id
    }
  }
`

const FlagButton = ({ type, id }) => {
  const handleAnswer = (res) => {
    let issue = res.data.createIssue
    const questionId = issue.answer.questionId
    console.log({ id: issue.id, questionId: questionId })
    updateIssue({
      variables: { id: issue.id, input: { questionId: questionId } },
    })
  }

  const handleComment = (res) => {
    console.log(res)
    let issue = res.data.createIssue
    // Hér er comment við answer
    let questionId
    if (issue.answerComment.questionId === 0) {
      console.log(issue.answerComment.answer.questionId)
      questionId = issue.answerComment.answer.questionId
    }
    // Hér er comment við question
    else {
      questionId = issue.answerComment.questionId
    }
    console.log({ id: issue.id, questionId: questionId }, 'color:green')
    updateIssue({
      variables: { id: issue.id, input: { questionId: questionId } },
    })
  }

  const [updateIssue] = useMutation(UPDATE_ISSUE)
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
  const [createIssue] = useMutation(CREATE_ISSUE, {
    onCompleted: () => toast.success('Móttekið'),
  })

  const handleFlag = () => {
    setIsClicked(!isClicked)
  }

  const handleMutation = (data) => {
    switch (type) {
      case 'answer':
        data.answerId = id
        console.log(data)
        console.log(
          createIssue({ variables: { input: data } }).then((res) =>
            handleAnswer(res)
          )
        )
        break
      case 'question':
        data.questionId = id
        console.log(data)
        console.log(createIssue({ variables: { input: data } }))
        break
      case 'comment':
        data.answerCommentId = id
        console.log(
          createIssue({ variables: { input: data } }).then((res) =>
            handleComment(res, true)
          )
        )
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
