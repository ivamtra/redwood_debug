import { render } from '@redwoodjs/testing/web'

import NotificationTestPage from './NotificationTestPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NotificationTestPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NotificationTestPage />)
    }).not.toThrow()
  })
})
