import { render } from '@redwoodjs/testing/web'

import FlagButton from './FlagButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FlagButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FlagButton />)
    }).not.toThrow()
  })
})
