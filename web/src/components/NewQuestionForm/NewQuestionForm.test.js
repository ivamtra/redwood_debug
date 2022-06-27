import { render } from '@redwoodjs/testing/web'

import NewQuestionForm from './NewQuestionForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewQuestionForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewQuestionForm />)
    }).not.toThrow()
  })
})
