import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const QuestionPage = () => {
  return (
    <>
      <MetaTags title="Question" description="Question page" />

      <h1>QuestionPage</h1>
      <p>
        Find me in <code>./web/src/pages/QuestionPage/QuestionPage.js</code>
      </p>
      <p>
        My default route is named <code>question</code>, link to me with `
        <Link to={routes.question()}>Question</Link>`
      </p>
    </>
  )
}

export default QuestionPage
