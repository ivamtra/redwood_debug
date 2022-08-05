import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import IssuesCell from 'src/components/IssuesCell/IssuesCell'

const IssuesPage = () => {
  return (
    <>
      <MetaTags title="Issues" description="Issues page" />

      <h1>IssuesPage</h1>
      <p>
        Find me in <code>./web/src/pages/IssuesPage/IssuesPage.js</code>
      </p>
      <p>
        My default route is named <code>issues</code>, link to me with `
        <Link to={routes.issues()}>Issues</Link>`
      </p>

      <IssuesCell />
    </>
  )
}

export default IssuesPage
