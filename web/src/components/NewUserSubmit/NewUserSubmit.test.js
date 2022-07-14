import { render } from '@redwoodjs/testing/web'

import NewUserSubmit from './NewUserSubmit'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewUserSubmit', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewUserSubmit />)
    }).not.toThrow()
  })
})
