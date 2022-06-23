import { render } from '@redwoodjs/testing/web'

import AnswerCommentForm from './AnswerCommentForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AnswerCommentForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AnswerCommentForm />)
    }).not.toThrow()
  })
})
