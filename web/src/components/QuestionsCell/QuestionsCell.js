import { useEffect, useMemo } from 'react'

import ReactSearchBox from 'react-search-box'

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

// Breytir spurningum þannig hægt er að nota searchbar
const mutateQuestionsForSearch = (questions) => {
  let returnList = []
  questions.forEach((item) => {
    const object = { ...item, key: item.id, value: item.title }
    returnList.push(object)
  })
  return returnList
}

export const Success = ({ questions }) => {
  const searchData = useMemo(() => mutateQuestionsForSearch(questions))
  useEffect(() => console.log(searchData), [questions, searchData])
  return (
    <>
      <ReactSearchBox data={searchData} />
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
