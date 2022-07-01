import { useEffect, useLayoutEffect, useState } from 'react'

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

export const Success = ({ answerComments, answerId }) => {
  const [list, setList] = useState([])

  useEffect(() => console.log(answerComments))

  useLayoutEffect(() => sortComments, [])

  const sortComments = () => {
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
    setList(finalList)
    console.log(list)
    console.log(root)

    let returnList = []

    root.walk((node) => {
      node.model.children = null
      console.log(node.model)
      if (node.model.id !== 0) {
        returnList.push(node.model)
      }
    })
    setList(returnList)

    return finalList
  }
  return (
    <div>
      {list.map((item) => {
        return (
          <AnswerCommentCell key={item.id} id={item.id} answerId={answerId} />
        )
      })}
      <button onClick={sortComments}>Sort comments</button>
    </div>
  )
}
