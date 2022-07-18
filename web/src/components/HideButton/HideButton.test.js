import { render } from '@redwoodjs/testing/web'

import HideButton from './HideButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HideButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HideButton />)
    }).not.toThrow()
  })
})
