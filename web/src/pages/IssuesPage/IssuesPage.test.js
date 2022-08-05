import { render } from '@redwoodjs/testing/web'

import IssuesPage from './IssuesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('IssuesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IssuesPage />)
    }).not.toThrow()
  })
})
