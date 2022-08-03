import { useEffect, useLayoutEffect, useState } from 'react'

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
      level
    }
  }
`

// Fyrir CSS til að fá indent í comment
const cssLevel = {
  1: 'left-[10px]',
  2: 'left-[20px]',
  3: 'left-[30px]',
  4: 'left-[40px]',
  5: 'left-[50px]',
  6: 'left-[60px]',
  7: 'left-[70px]',
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ customAnswerComments, answerId, questionId }) => {
  const [list, setList] = useState([])

  useEffect(() => {
    console.log(commentSort(undefined))
    console.log(commentSort(null))
  })

  useLayoutEffect(() => {
    setList(commentSort(customAnswerComments))
  }, [customAnswerComments])

  return (
    <div>
      {list.map((item) => {
        return (
          <div
            key={item.id}
            className={'mt-4 relative ' + cssLevel[item.level]}
          >
            <AnswerCommentCell
              key={item.id}
              id={item.id}
              answerId={answerId}
              questionId={questionId}
            />
          </div>
        )
      })}
    </div>
  )
}
