//TODO: Vantar að query-a fyrir utan react componentinn

import { useEffect, useMemo, useState } from 'react'

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useApolloClient,
} from '@apollo/client'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'

import Tree from 'src/algos/Tree'
import TreeNode from 'src/algos/TreeNode'
import AnswerCell from 'src/components/AnswerCell'

// let apolloClient

// const httpLink = new HttpLink({
//   uri: 'http://localhost:8911/graphql',
// })

// function createApolloClient() {
//   return new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache(),
//   })
// }

// export function initializeApollo() {
//   const _apolloClient = apolloClient ?? createApolloClient()
//   if (!apolloClient) apolloClient = _apolloClient

//   return _apolloClient
// }

// export function useApollo() {
//   const store = useMemo(() => initializeApollo(initialState), [initialState])
//   return store
// }

const TreeModel = require('tree-model'),
  tree = new TreeModel(),
  root = tree.parse({ id: 0 })

const CommentQuery = gql`
  query FindAnswerCommentQuery {
    answerComments(answerId: 5) {
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

const CommentByParentId = gql`
  query FindCommentByParentId($parentId: Int) {
    answerCommentsByParentId(parentId: $parentId) {
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

// const QueryCommentByParentId = async (parentId) => {
//   const client = initializeApollo()
//   const res = await client.query({
//     query: CommentByParentId,
//     variables: { parentId: parentId },
//   })
//   return res
// }

const CommentTestPage = () => {
  // useMemo fyrir trjáreikniritið
  useEffect(() => {
    console.log(tree)
    console.log(data)
  })

  const [list, setList] = useState([])

  const logComments = () => {
    console.log(data)
  }

  const client = useApolloClient()

  // Þetta fall fer í AnswerCell.js
  const sortComments = () => {
    //Clone-a answerComments fylkið
    console.log(data.answerComments)
    const tempList = [...data.answerComments]
    console.log(tempList)
    // Nýjustu commentin koma fyrst þegar búið er að reverse-a
    const reversedList = tempList.reverse()
    console.log(reversedList)

    let childrenAdded = 0
    let idQueue = []
    let parentId = 0
    let level = 1
    let finalList = []
    let nodeQueue = []
    let currentTreeNode = root
    console.log(currentTreeNode)
    while (childrenAdded !== reversedList.length) {
      reversedList.forEach((item) => {
        if (item.parentId === parentId) {
          idQueue.push(item.id)
          finalList.push(item.id)
          let newNode = tree.parse({ id: item.id })
          currentTreeNode.addChild(newNode)
          nodeQueue.push(newNode)
          console.log(item)
          console.log('level: ' + idQueue.length)
          console.log(parentId)
          childrenAdded++
        }
      })
      console.log('childrenAdded: ' + childrenAdded)
      console.log('list length ' + reversedList.length)
      console.log(childrenAdded === reversedList.length)

      console.log(idQueue)

      // currentTreeNode = null
      currentTreeNode = nodeQueue[0]
      console.log(currentTreeNode)
      nodeQueue.shift()
      parentId = idQueue[0]
      console.log(parentId)
      console.log(root)
      idQueue.shift()
    }
    console.log(tree)
    console.log(finalList)
    root.walk((node) => {
      console.log(node.model.id)
    })
    return finalList
  }
  // const fetchCommentsByParentId = (parentId) => {
  //   const { data, loading, error } = useQuery(CommentByParentId, {
  //     variables: { parentId: parentId },
  //   })
  // }

  const { data, loading, error } = useQuery(CommentQuery)
  return (
    <>
      <MetaTags title="CommentTest" description="CommentTest page" />
      <h1>CommentTestPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/CommentTestPage/CommentTestPage.js</code>
      </p>
      <p>
        My default route is named <code>commentTest</code>, link to me with `
        <Link to={routes.commentTest()}>CommentTest</Link>`
      </p>
      <button onClick={sortComments}>Sort comments</button>
      <button onClick={logComments}>Log data</button>
      <h1>AnswerCell id=5</h1>
      <h1>---------------------------------------</h1>
      <AnswerCell id={5} />
    </>
  )
}

export default CommentTestPage
