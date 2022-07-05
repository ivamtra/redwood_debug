import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AnswerPage = () => {
  return (
    <>
      <MetaTags title="Answer" description="Answer page" />

      <h1>AnswerPage</h1>
      <p>
        Find me in <code>./web/src/pages/AnswerPage/AnswerPage.js</code>
      </p>
      <p>
        My default route is named <code>answer</code>, link to me with `
        <Link to={routes.answer()}>Answer</Link>`
      </p>
    </>
  )
}

export default AnswerPage
