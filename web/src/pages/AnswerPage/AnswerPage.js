import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import AnswerForm from 'src/components/AnswerForm/AnswerForm'

const AnswerPage = () => {
  return (
    <>
      <MetaTags title="Answer" description="Answer page" />

      <h1>AnswerPage</h1>

      <AnswerForm questionId={23} />
    </>
  )
}

export default AnswerPage
