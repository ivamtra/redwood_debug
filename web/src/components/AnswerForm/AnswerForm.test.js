import { render } from '@redwoodjs/testing/web'

import AnserForm from './AnserForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AnserForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AnserForm />)
    }).not.toThrow()
  })
})
