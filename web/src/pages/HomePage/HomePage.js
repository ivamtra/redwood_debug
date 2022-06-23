import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import AnswerCell from 'src/components/AnswerCell/AnswerCell'
import AnswerCommentCell from 'src/components/AnswerCommentCell/AnswerCommentCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Test" description="Home page" />

      <h1>-------------------------------------------------</h1>

      <h1>TestPage</h1>

      <h1>-------------------------------------------------</h1>
      <h1>Test Svör</h1>
      <h1>-------------------------------------------------</h1>

      <div>
        <AnswerCell id={1} />
      </div>

      <h1>-------------------------------------------------</h1>
      <h1>Test Comment</h1>
      <h1>-------------------------------------------------</h1>
      <AnswerCommentCell id={1} />
    </>
  )
}

export default HomePage
