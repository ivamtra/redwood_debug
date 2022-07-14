import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import AnswerCell from 'src/components/AnswerCell'
import AnswerForm from 'src/components/AnswerForm/AnswerForm'

const AnswerPage = ({ id }) => {
  return (
    <>
      <MetaTags title="Answer" description="Answer page" />

      <h1>AnswerPage</h1>

      <AnswerForm questionId={7} />
      {/* <AnswerCell id={id} /> */}
    </>
  )
}

export default AnswerPage
