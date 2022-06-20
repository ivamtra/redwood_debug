import { render } from '@redwoodjs/testing/web'

import FormsPage from './FormsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FormsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FormsPage />)
    }).not.toThrow()
  })
})
