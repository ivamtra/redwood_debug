import { render } from '@redwoodjs/testing/web'

import NotificationForm from './NotificationForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NotificationForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NotificationForm />)
    }).not.toThrow()
  })
})
