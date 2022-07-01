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
    const reversedList = tempList.reverse()
    console.log(reversedList)

    let childrenAdded = 0
    let nodeQueue = []
    let parentId = 0
    let level = 1
    let finalList = []
    while (childrenAdded !== reversedList.length) {
      reversedList.forEach((item) => {
        // console.log(item)
        if (item.parentId == parentId) {
          nodeQueue.push(item)
          finalList.push(item)
          console.log(item)
          console.log(parentId)
          childrenAdded++
        }
      })
      console.log('childrenAdded: ' + childrenAdded)
      console.log('list length ' + reversedList.length)
      console.log(childrenAdded === reversedList.length)

      console.log(nodeQueue)
      parentId = nodeQueue[0].id
      console.log('parentId: ' + parentId)
      nodeQueue.shift()
      console.log(nodeQueue)
    }
    console.log(finalList)
    setList(finalList)
    console.log(list)
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
