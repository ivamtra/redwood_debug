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

const TreeModel = require('tree-model'),
  tree = new TreeModel(),
  root = tree.parse({ id: 0 })

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

const newSortComments = (answerComments) => {
  // Stilla hakkatöflu
  const hashMap = new Map()
  answerComments.forEach((item) => {
    try {
      hashMap.set(item.parentId, [...hashMap.get(item.parentId), item.id])
    } catch {
      hashMap.set(item.parentId, [item.id])
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

  //Debug counter
  let counter = 0

  // Ítra í gegn
  while (stack.length !== 0) {
    currentNode = stack.pop()
    returnList.push(currentNode)
    currentChildren = hashMap.get(currentNode)
    console.log(currentChildren)
    try {
      currentChildren.forEach((item) => stack.push(item))
    } catch {}

    console.log(returnList)
    //Debug
    counter++
    if (counter > 20) return
  }
  console.log(returnList)
}

const sortComments = (answerComments) => {
  //Clone-a answerComments fylkið
  console.log(answerComments)
  const tempList = [...answerComments]
  console.log(tempList)
  // Nýjustu commentin koma fyrst þegar búið er að reverse-a
  let reversedList = tempList.reverse()
  console.log(reversedList)

  let childrenAdded = 0
  let idQueue = []
  let parentId = 0
  let finalList = []
  let currentTreeNode = root
  let nodeQueue = []
  while (childrenAdded !== reversedList.length) {
    reversedList.forEach((item) => {
      // console.log(item)
      if (item.parentId == parentId) {
        idQueue.push(item)
        finalList.push(item)
        let mutableItem = { ...item }
        let newNode = tree.parse(mutableItem)
        currentTreeNode.addChild(newNode)
        nodeQueue.push(newNode)
        console.log(item)
        console.log(parentId)
        childrenAdded++
      }
    })
    console.log('childrenAdded: ' + childrenAdded)
    console.log('list length ' + reversedList.length)
    console.log(childrenAdded === reversedList.length)

    currentTreeNode = nodeQueue[0]
    console.log(currentTreeNode)
    nodeQueue.shift()

    console.log(idQueue)
    parentId = idQueue[0].id
    console.log('parentId: ' + parentId)
    idQueue.shift()
    console.log(idQueue)
  }
  console.log(finalList)
  console.log(root)

  let returnList = []

  root.walk((node) => {
    node.model.children = null
    console.log(node.model)
    if (node.model.id !== 0) {
      returnList.push(node.model)
    }
  })

  return returnList
}

export const Success = ({ answerComments, answerId }) => {
  const [list, setList] = useState([])

  //useEffect(() => console.log(answerComments))

  useLayoutEffect(() => {
    setList(sortComments(answerComments))
  }, [answerComments])

  return (
    <div>
      <button onClick={() => newSortComments(answerComments)}>
        New Sort comments
      </button>
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
