import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import AnswerCell from 'src/components/AnswerCell/AnswerCell'

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
    </>
  )
}

export default HomePage
