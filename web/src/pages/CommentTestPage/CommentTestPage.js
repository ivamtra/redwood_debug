import { useEffect } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'

const CommentQuery = gql`
  query FindAnswerCommentQuery {
    answerComments {
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
  useEffect(function () {
    setTimeout(() => console.log(data), 1000)
  })

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
    </>
  )
}

export default CommentTestPage
