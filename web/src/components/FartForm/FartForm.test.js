import { render } from '@redwoodjs/testing/web'

import FartForm from './FartForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FartForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FartForm />)
    }).not.toThrow()
  })
})
