/*
 * Pottþétt betri leið til að gera þetta
 */

// TODO: Bæta þessum component í question form og sækja lista

import { useState } from 'react'

// Placeholder til að það sýni eina línu í viðmótinu
const initialList = [
  {
    id: '0',
    sentence: 'placeholder',
  },
]

let returnList

const TestForm = () => {
  const [idIndex, setIdIndex] = useState(1)
  const [textArray, setTextArray] = useState(initialList)
  const [textValue, setTextValue] = useState('')
  const [finalList, setFinalList] = useState([])
  const [isDonePressed, setDonePressed] = useState(false)
  const [isFinishedPressed, setFinishedPressed] = useState(false)

  // Geymir textann
  const onChange = (e) => {
    setTextValue(e.target.value)
  }

  // Bæta við nýju gildi í listann
  const handle = () => {
    setIdIndex(idIndex + 1)
    setTextArray([...textArray, { id: String(idIndex), sentence: textValue }])

    console.log(idIndex)
    console.log(textValue)
    console.log(textArray)
  }

  // Þegar ýtt er á done takkann
  // FIXME: Þetta þarf alltaf að keyra tvisvar til að virka
  const onDone = async () => {
    setDonePressed(true)
    let tempList = [...textArray]
    tempList.shift()
    setFinalList([...tempList, { id: String(idIndex), sentence: textValue }])
    // Uncommenta til að láta viðmótslistann hverfa
    //while (textArray.length > 0) textArray.shift()
    console.log(finalList)
    console.log('list-length = ' + finalList.length)
    console.log('index = ' + idIndex)
  }

  // Þegar ýtt er á submit takkann
  const onFinished = () => {
    console.log(finalList)
    if (finalList.length === idIndex) {
      // Gera ehv
      setFinishedPressed(true)
      console.log('success')
      returnList = finalList
      console.log(returnList)
      return returnList
    } else {
      // Gera ehv
      console.log('villa')
    }
  }
  return (
    <>
      <div>
        <ul>
          {textArray.map((item) => (
            <li key={item.id}>
              <div>
                {/* <p>{textValue}</p> */}
                <input
                  onChange={onChange}
                  type="textfield"
                  name={item.id}
                  id={item.id}
                  disabled={item.id < idIndex - 1 || isDonePressed}
                  placeholder={item.id}
                />
                <button onClick={handle}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <button disabled={isDonePressed} onClick={onDone}>
          Done
        </button>
        <button
          disabled={!isDonePressed || isFinishedPressed}
          onClick={onFinished}
        >
          Submit
        </button>
      </div>
    </>
  )
}

export default TestForm
