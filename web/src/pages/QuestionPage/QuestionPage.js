import { useEffect } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import QuestionCell from 'src/components/QuestionCell/QuestionCell'

//TODO: Fá inn parameter frá Notification
const QuestionPage = ({ id, answerId, commentId }) => {
  // answerId og commentId fást frá notification
  // Focusa á þann component þegar parameterinn fæst inn
  useEffect(() => console.log(answerId))
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
