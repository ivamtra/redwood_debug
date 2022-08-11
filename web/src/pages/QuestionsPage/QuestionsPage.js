import { SearchField } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import QuestionsCell from 'src/components/QuestionsCell/QuestionsCell'

const QuestionsPage = () => {
  return (
    <>
      <MetaTags title="Questions" description="Questions page" />

      {/* <h1>QuestionsPage</h1> */}

      <QuestionsCell />
    </>
  )
}

export default QuestionsPage
