import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import commentSort from 'src/algos/commentSort'

import AnswerCommentCell from '../AnswerCommentCell'

export const QUERY = gql`
  query AnswerCommentsQuery($answerId: Int!) {
    answerComments(answerId: $answerId) {
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

export const Success = ({ answerComments, answerId }) => {
  const [list, setList] = useState([])

  useLayoutEffect(() => {
    setList(commentSort(answerComments))
  }, [answerComments])

  return (
    <div>
      {list.map((item) => {
        return (
          <AnswerCommentCell key={item.id} id={item.id} answerId={answerId} />
        )
      })}
    </div>
  )
}
