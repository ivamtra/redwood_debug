import { render } from '@redwoodjs/testing/web'

import QuestionSentenceForm from './QuestionSentenceForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('QuestionSentenceForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<QuestionSentenceForm />)
    }).not.toThrow()
  })
})
