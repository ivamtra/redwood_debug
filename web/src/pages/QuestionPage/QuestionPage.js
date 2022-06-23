import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import QuestionCell from 'src/components/QuestionCell/QuestionCell'

const QuestionPage = ({ id }) => {
  return (
    <>
      <MetaTags title="Question" description="Question page" />

      <h1>QuestionPage</h1>
      <p>
        Find me in <code>./web/src/pages/QuestionPage/QuestionPage.js</code>
      </p>
      <p>
        My default route is named <code>question</code>, link to me with `
      </p>
      <QuestionCell id={id} />
    </>
  )
}

export default QuestionPage
