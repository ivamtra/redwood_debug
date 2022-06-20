import { useState } from 'react'

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
    console.log(finalList)
  }

  // FIXME: Þetta þarf alltaf að keyra tvisvar til að virka
  const onDone = () => {
    let tempList = [...textArray]
    tempList.shift()
    setFinalList([...tempList, { id: String(idIndex), sentence: textValue }])
    while (textArray.length > 0) textArray.shift()
    console.log(finalList)
    console.log('list-length = ' + finalList.length)
    console.log('index = ' + idIndex)
  }

  const onFinished = () => {
    if (finalList.length === idIndex) {
      // Gera ehv
      console.log('success')
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
        <button onClick={onDone}>Done</button>
        <button onClick={onFinished}>Submit</button>
      </div>
    </>
  )
}

export default TestForm
