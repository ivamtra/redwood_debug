import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { node } from 'prop-types'

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
 */
const newSortComments = (answerComments) => {
  // Stilla hakkatöflu
  const hashMap = new Map()
  answerComments.forEach((item) => {
    try {
      hashMap.set(item.parentId, [...hashMap.get(item.parentId), item])
    } catch {
      hashMap.set(item.parentId, [item])
    }
  })
  console.log(hashMap)

  const stack = []
  let currentChildren = hashMap.get(0)
  currentChildren.forEach((child) => {
    stack.push(child)
  })
  console.log(stack)
  let currentNode
  let returnList = []

  // Ítra í gegn
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
  // const testList = useRef(newSortComments(answerComments))

  //useEffect(() => console.log(answerComments))

  useLayoutEffect(() => {
    setList(newSortComments(answerComments))
  }, [answerComments])

  // useEffect(() => {
  //   console.log(testList)
  //   console.log(newSortComments)
  // })

  return (
    <div>
      <button onClick={() => testSort()}>New Sort comments</button>
      {list.map((item) => {
        return (
          <AnswerCommentCell key={item.id} id={item.id} answerId={answerId} />
        )
      })}
      {/* Þarf ekki vegna useEffect */}
      {/* <button onClick={sortComments}>Show comments</button> */}
    </div>
  )
}
