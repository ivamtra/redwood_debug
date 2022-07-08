/*
 * Component fyrir Delete takka.
 * Takkinn eyðir í rauninni ekki gögnum heldur felur þau bara.
 */

import { useMutation } from '@redwoodjs/web'

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

const DeleteButton = ({ id }) => {
  const [updateComment] = useMutation(UPDATE_COMMENT, {
    refetchQueries: [{ query: refetchCommentQuery, variables: { id } }],
  })
  const [createComment] = useMutation(CREATE_COMMENT)

  const handleDelete = () => {
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

  const handleCreate = (data) => {
    console.log(data)
    const userId = data.data.updateAnswerComment.userId
    const rating = data.data.updateAnswerComment.rating
    const level = data.data.updateAnswerComment.level
    const id = data.data.updateAnswerComment.id
    const body = data.data.updateAnswerComment.body + ' \n vísar í id:' + id
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
