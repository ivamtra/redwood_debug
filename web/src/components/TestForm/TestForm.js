import { useState } from 'react'

import { render } from 'react-dom'

import { Form, Submit, TextField } from '@redwoodjs/forms'
const initialList = [
  {
    id: '0',
    sentence: 'test',
  },
]

const test = () => {
  console.log('test')
}

const TestForm = () => {
  const [idIndex, setIdIndex] = useState(1)
  const [textArray, setTextArray] = useState(initialList)
  const [textValue, setTextValue] = useState('')
  const [finalList, setFinalList] = useState([])
  const [isDisabledList, setDisabledList] = useState([true])

  const onChange = (e) => {
    setTextValue(e.target.value)
  }

  const handle = () => {
    setIdIndex(idIndex + 1)
    setTextArray([...textArray, { id: String(idIndex), sentence: textValue }])

    console.log(idIndex)
    console.log(textValue)
    console.log(textArray)
    console.log(isDisabledList.length)
  }

  const consoleLog = () => {
    for (let i = 0; i < 2; i++) console.log(finalList)
  }

  const onPoop = () => {
    let tempList = [...textArray]
    tempList.shift()
    setFinalList([...tempList, { id: String(idIndex), sentence: textValue }])
    while (textArray.length > 0) textArray.shift()
  }
  return (
    <>
      <div>
        <ul>
          {textArray.map((item) => (
            <li key={item.id}>
              <div>
                <p>{textValue}</p>
                <input
                  onChange={onChange}
                  type="textfield"
                  name={item.id}
                  id={item.id}
                  disabled={item.id < idIndex - 1}
                  placeholder={item.id}
                />
                <button onClick={handle}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={onPoop}>Submit</button>
        <button onClick={consoleLog}>Log</button>
      </div>
    </>
  )
}

export default TestForm
