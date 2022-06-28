import { render } from '@redwoodjs/testing/web'

import CommentTestPage from './CommentTestPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CommentTestPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentTestPage />)
    }).not.toThrow()
  })
})
