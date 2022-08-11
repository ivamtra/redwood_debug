import { useEffect, useMemo } from 'react'

import { BsSearch } from 'react-icons/bs'
import ReactSearchBox from 'react-search-box'

import { navigate, routes } from '@redwoodjs/router'

import QuestionCell from '../QuestionCell/QuestionCell'

export const QUERY = gql`
  query QuestionsQuery {
    questions {
      id
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ questions }) => {
  // const searchData = useMemo(
  //   () => mutateQuestionsForSearch(questions),
  //   [questions]
  // )
  // useEffect(() => console.log(searchData), [questions, searchData])
  return (
    <>
      <div className="pt-4 max-w-md">
        {/* <ReactSearchBox
          data={searchData}
          onSelect={onSelect}
          placeholder="Leita af orði"
          className="inline"
        /> */}
      </div>
      <ul>
        {questions.map((item) => {
          return (
            <div key={item.id} className="mt-11">
              <QuestionCell inQuestionsCell={true} key={item.id} id={item.id} />
            </div>
          )
        })}
      </ul>
    </>
  )
}
