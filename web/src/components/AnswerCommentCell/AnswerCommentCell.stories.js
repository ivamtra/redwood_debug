import { Loading, Empty, Failure, Success } from './AnswerCommentCell'
import { standard } from './AnswerCommentCell.mock'

export const loading = () => {
  return Loading ? <Loading /> : null
}

export const empty = () => {
  return Empty ? <Empty /> : null
}

export const failure = () => {
  return Failure ? <Failure error={new Error('Oh no')} /> : null
}
export const success = () => {
  console.log(standard())
  mockCurrentUser({
    id: 3,
  })
  return Success ? <Success {...standard()} /> : null
}

export default { title: 'Cells/AnswerCommentCell' }
