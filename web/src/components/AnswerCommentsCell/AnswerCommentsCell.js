import { useState } from 'react'

import AnswerCommentCell from '../AnswerCommentCell'

export const QUERY = gql`
  query AnswerCommentsQuery($answerId: Int!) {
    answerComments(answerId: $answerId) {
      id
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

  const sortComments = () => {
    //Clone-a answerComments fylkið
    console.log(answerComments)
    const tempList = [...answerComments]
    console.log(tempList)
    // Nýjustu commentin koma fyrst þegar búið er að reverse-a
    const reversedList = tempList.reverse()
    console.log(reversedList)

    let childrenAdded = 0
    let nodeQueue = []
    let parentId = 0
    let level = 1
    let finalList = []
    let currentTreeNode = tree.root
    while (childrenAdded !== reversedList.length) {
      reversedList.forEach((item) => {
        if (item.parentId === parentId) {
          nodeQueue.push(item.id)
          finalList.push(item.id)
          currentTreeNode.add(item.id)
          console.log(item)
          console.log('level: ' + nodeQueue.length)
          console.log(parentId)
          childrenAdded++
        }
      })
      console.log('childrenAdded: ' + childrenAdded)
      console.log('list length ' + reversedList.length)
      console.log(childrenAdded === reversedList.length)

      console.log(nodeQueue)
      parentId = nodeQueue[0]
      console.log(parentId)
      nodeQueue.shift()
    }
    console.log(finalList)
    setList(finalList)
    return finalList
  }
  return (
    <div>
      {answerComments.map((item) => {
        return (
          <AnswerCommentCell key={item.id} id={item.id} answerId={answerId} />
        )
      })}
    </div>
  )
}
