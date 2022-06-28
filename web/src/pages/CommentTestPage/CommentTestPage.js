import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const CommentTestPage = () => {
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
