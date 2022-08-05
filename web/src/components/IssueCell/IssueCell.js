import { BiLinkExternal } from 'react-icons/bi'

import { Link, routes } from '@redwoodjs/router'

import { getTimeAndDateIS } from '../../customUtils/DateUtils'

export const QUERY = gql`
  query FindIssueQuery($id: Int!) {
    issue: issue(id: $id) {
      id
      user {
        id
        email
        name
      }
      questionId
      answerId
      answerCommentId
      description
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ issue }) => {
  const [time, date] = getTimeAndDateIS(issue.createdAt)

  return (
    <>
      <div className="flex-grow max-w-xl shadow-lg p-4 rounded-lg bg-white text-slate-500">
        <div className="flex flex-col pt-4">
          <div className="flex flex-row justify-between">
            <p className="text-lg font-bold pb-4">Vandamál nr. {issue.id}</p>
            <p>
              {' '}
              <Link
                to={routes.question({
                  id: issue.questionId,
                  answerId: issue.answerId,
                  commentId: issue.answerCommentId,
                })}
              >
                <BiLinkExternal />
              </Link>
            </p>
          </div>
          <div className="flex flex-col pb-4">
            <p>
              <strong>Upplýsingar um vandamál</strong>
            </p>
            <div className="flex bg-zinc-100 max-w-sm">{issue.description}</div>
          </div>
          {/* Submitted by section */}
          <div className="text-right text-xs italic mt-4">
            Sent inn af <strong>{issue.user.email}</strong> {'   '}
            <strong>{date}</strong> | <strong>{time}</strong>
          </div>
        </div>
      </div>
    </>
  )
}
