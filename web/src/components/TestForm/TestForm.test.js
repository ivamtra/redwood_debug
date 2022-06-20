import { render } from '@redwoodjs/testing/web'

import TestForm from './TestForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TestForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TestForm />)
    }).not.toThrow()
  })
})
