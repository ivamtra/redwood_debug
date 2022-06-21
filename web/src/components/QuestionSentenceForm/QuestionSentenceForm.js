import { Submit, Form } from '@redwoodjs/forms'

const QuestionSentenceForm = ({ question, sentences }) => {
  return (
    <div>
      <p>Í Child component</p>
      <button
        onClick={() => {
          console.log(question)
        }}
      >
        log question
      </button>
      <button onClick={() => console.log(sentences)}>log sentences</button>
      <p>Question component</p>
    </div>
  )
}

export default QuestionSentenceForm
