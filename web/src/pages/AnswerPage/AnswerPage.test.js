import { render } from '@redwoodjs/testing/web'

import AnswerPage from './AnswerPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AnswerPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AnswerPage />)
    }).not.toThrow()
  })
})
