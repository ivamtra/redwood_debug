import { useEffect, useLayoutEffect, useRef, useState } from 'react'

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

/*
 * Reikniritið byggir upp net með
 * key-value adjacency list og
 * ítrar í gegnum það með DFS
 * til að skila kommentum í rétta röð
 *
 * Tímaflækja O(n) ef notaður er LinkedList
 */
const newSortComments = (answerComments) => {
  // Stilla hakkatöflu
  // Ætti að vera O(n) ef append er O(1)
  const hashMap = new Map()
  answerComments.forEach((item) => {
    try {
      hashMap.set(item.parentId, [...hashMap.get(item.parentId), item])
    } catch {
      hashMap.set(item.parentId, [item])
    }
  })
  console.log(hashMap)

  // Upphafsstilling
  const stack = []
  let currentChildren = hashMap.get(0)
  currentChildren.forEach((child) => {
    stack.push(child)
  })
  console.log(stack)
  let currentNode
  let returnList = []

  // Ítra í gegn með DFS
  while (stack.length !== 0) {
    currentNode = stack.pop()
    returnList.push(currentNode)
    currentChildren = hashMap.get(currentNode.id)
    console.log(currentChildren)
    try {
      currentChildren.forEach((item) => stack.push(item))
    } catch {
      /* Engin börn */
    }
  }
  console.log(returnList)
  return returnList
}

export const Success = ({ answerComments, answerId }) => {
  const [list, setList] = useState([])

  useLayoutEffect(() => {
    setList(newSortComments(answerComments))
  }, [answerComments])

  return (
    <div>
      <button onClick={() => testSort()}>New Sort comments</button>
      {list.map((item) => {
        return (
          <AnswerCommentCell key={item.id} id={item.id} answerId={answerId} />
        )
      })}
    </div>
  )
}
