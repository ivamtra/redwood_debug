import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import QuestionCell from 'src/components/QuestionCell/QuestionCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>-------------------------------------------------</h1>

      <h1 className="bg-slate-100 text-slate-700">HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.js</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
      <h1>-------------------------------------------------</h1>
      <h1>Test Spurningar</h1>
      <h1>-------------------------------------------------</h1>

      <div>
        <QuestionCell id={1} />
        <h1>-------------------------------------------------</h1>
        <QuestionCell id={2} />
      </div>
    </>
  )
}

export default HomePage
