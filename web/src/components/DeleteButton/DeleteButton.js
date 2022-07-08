/*
 * Component fyrir Delete takka.
 * Takkinn eyðir í rauninni ekki gögnum heldur felur þau bara.
 */

import { useRef } from 'react'

import { useMutation, useQuery } from '@redwoodjs/web'

import { QUERY as refetchCommentQuery } from '../AnswerCommentCell'
// import { CREATE_COMMENT } from '../AnswerCommentForm/AnswerCommentForm'

const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: Int!, $input: UpdateAnswerCommentInput!) {
    updateAnswerComment(id: $id, input: $input) {
      id
      body
      userId
      level
      rating
    }
  }
`
const CREATE_COMMENT = gql`
  mutation CreateAnswerComment($input: CreateAnswerCommentInput!) {
    createAnswerComment(input: $input) {
      id
    }
  }
`

const COMMENT_QUERY = gql`
  query FindAnswerCommentQuery($id: Int!) {
    answerComment: answerComment(id: $id) {
      body
    }
  }
`

const DeleteButton = ({ id }) => {
  let previousBody = useRef('')
  const [updateComment] = useMutation(UPDATE_COMMENT, {
    refetchQueries: [{ query: refetchCommentQuery, variables: { id } }],
  })
  const [createComment] = useMutation(CREATE_COMMENT)
  const { data } = useQuery(COMMENT_QUERY, { variables: { id } })

  const handleDelete = () => {
    console.log(data)
    previousBody = data.answerComment.body
    console.log(previousBody)
    console.log(data.answerComment.body)
    console.log('clicked')
    const input = {
      body: '[Deleted]',
    }

    updateComment({
      variables: { input: input, id: id },
    }).then((result) => {
      handleCreate(result)
    })
  }

  // Höndlar það að búa til nýtt komment
  const handleCreate = (result) => {
    console.log(result)
    const userId = result.data.updateAnswerComment.userId
    const rating = result.data.updateAnswerComment.rating
    const level = result.data.updateAnswerComment.level
    const id = result.data.updateAnswerComment.id
    const body = previousBody + ' \n vísar í id:' + id
    const input = {
      body: body,
      userId: userId,
      parentId: 0,
      answerId: 0,
      level: level,
      rating: rating,
    }
    console.log(input)
    createComment({ variables: { input: input } })
  }
  return (
    <>
      <button onClick={handleDelete}>Delete</button>
    </>
  )
}

export default DeleteButton
