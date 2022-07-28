import { useLayoutEffect, useState } from 'react'

import commentSort from 'src/algos/commentSort'

import AnswerCommentCell from '../AnswerCommentCell'

export const QUERY = gql`
  query AnswerCommentsQuery($answerId: Int!, $questionId: Int!) {
    customAnswerComments(answerId: $answerId, questionId: $questionId) {
      id
      user {
        email
      }
      body
      createdAt
      parentId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ customAnswerComments, answerId, questionId }) => {
  const [list, setList] = useState([])

  useLayoutEffect(() => {
    setList(commentSort(customAnswerComments))
  }, [customAnswerComments])

  return (
    <div>
      {list.map((item) => {
        return (
          <AnswerCommentCell
            key={item.id}
            id={item.id}
            answerId={answerId}
            questionId={questionId}
          />
        )
      })}
    </div>
  )
}
