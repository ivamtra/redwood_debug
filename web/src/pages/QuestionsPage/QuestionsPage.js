import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import QuestionsCell from 'src/components/QuestionsCell/QuestionsCell'

const QuestionsPage = () => {
  return (
    <>
      <MetaTags title="Questions" description="Questions page" />

      <h1>QuestionsPage</h1>
      <p>
        Find me in <code>./web/src/pages/QuestionsPage/QuestionsPage.js</code>
      </p>
      <p>
        My default route is named <code>questions</code>, link to me with `
        <Link to={routes.questions()}>Questions</Link>`
      </p>
      <QuestionsCell />
    </>
  )
}

export default QuestionsPage
