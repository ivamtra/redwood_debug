//TODO: Vantar að query-a fyrir utan react componentinn

import { useEffect } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'

import AnswerCell from 'src/components/AnswerCell'

const TreeModel = require('tree-model'),
  tree = new TreeModel(),
  root = tree.parse({ name: 'a', children: [{ name: 'b' }] })

const CommentQuery = gql`
  query FindAnswerCommentQuery {
    answerComments(answerId: 5) {
      id
      user {
        email
      }
      body
      createdAt
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
    }
  }
`

const CommentTestPage = () => {
  // useMemo fyrir trjáreikniritið
  useEffect(() => {
    console.log(tree)
    console.log(data)
  })

  const onClick = () => {
    console.log(data)
  }

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
      <button oClick={onClick}>Log data</button>
      <h1>AnswerCell id=5</h1>
      <h1>---------------------------------------</h1>
      <AnswerCell id={5} />
    </>
  )
}

export default CommentTestPage
