import { render } from '@redwoodjs/testing/web'

import RatingButton from './RatingButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RatingButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RatingButton />)
    }).not.toThrow()
  })
})
