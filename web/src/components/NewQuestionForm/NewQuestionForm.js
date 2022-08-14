import { useEffect, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Submit, Form, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { timeBetweenTwoDateStringsInSeconds } from 'src/customUtils/DateUtils'

//-------------- Database --------------------------------------------

//-------------- Create Question og Sentence -------------------------

const CREATE_QUESTION = gql`
  mutation CreateQuestionMutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
      createdAt
    }
  }
`
// => Sem fer í þetta statement
const CREATE_SENTENCE = gql`
  mutation CreateSentenceMutation($input: CreateSentenceInput!) {
    createSentence(input: $input) {
      id
    }
  }
`

//-------------- Update User ---------------------------------------

export const UPDATE_USER = gql`
  mutation UpdateUserMutation($input: UpdateUserInput!, $id: Int!) {
    updateUser(input: $input, id: $id) {
      id
      roles
    }
  }
`

//---------------- React Component ----------------------------------

// Handle new User
// Tekur inn currentUser
export const handleNewUser = (user) => {
  const timeRemainingInMinutes =
    60 -
    Math.round(
      timeBetweenTwoDateStringsInSeconds(
        user.createdAt,
        new Date().toISOString()
      ) / 60
    )
  toast.error('Try again in ' + timeRemainingInMinutes + ' minutes')
}

const NewQuestionForm = () => {
  const [createQuestion] = useMutation(CREATE_QUESTION, {
    onCompleted: () => toast.success('Question Created'),
  })
  const [createSentence] = useMutation(CREATE_SENTENCE)
  const { currentUser } = useAuth()
  const [textValue, setTextValue] = useState('')
  const [updateUser] = useMutation(UPDATE_USER) // ATH. hvort það þurfi refreshQuery

  const [list, setList] = useState([
    { listIndex: 0, sentence: 'placeholder', questionId: 0 },
  ])
  const [listIndex, setListIndex] = useState(1)

  // Bæta við setningu í listann
  const addSentence = () => {
    setListIndex(listIndex + 1)
    console.log(listIndex)
    let tempArray = [...list]
    tempArray.push({ listIndex: listIndex, sentence: textValue, questionId: 0 })
    setList(tempArray)
    console.log(list)
  }

  // Athuga hver er nýjasta setningin
  const onChange = (e) => setTextValue(e.target.value)

  const onSubmit = (questionData) => {
    console.log(currentUser.roles)
    handleQuestionMutation(questionData, 0)
  }

  // Höndlar gögnin sem fást úr listanum og sendir þau í gagnagrunninn
  const handleSentenceMutation = (questionId) => {
    // Undirbúa lokalistann
    setListIndex(listIndex + 1)
    let finalArray = [...list]
    finalArray.shift()
    finalArray.push({
      listIndex: listIndex,
      sentence: textValue,
      questionId: 0,
    })

    // Athuga duplicate/ eða tómt í síðasta
    if (finalArray.length >= 2) {
      const n = finalArray.length
      if (
        finalArray[n - 1].sentence === finalArray[n - 2].sentence ||
        finalArray[n - 1].sentence === ''
      ) {
        finalArray.pop()
      }
    }
    console.log(finalArray)

    // Bæta hverja setningu við gagnagrunninn
    finalArray.forEach((item) => {
      // Bæta við questionId úr createSentence
      console.log(questionId)
      const inputData = { sentence: item.sentence, questionId: questionId }
      console.log(inputData)
      // Setja hana í gagnagrunninn
      createSentence({
        variables: {
          input: inputData,
        },
      })
    })
  }

  // Höndlar gögn fyrir Question hlutinn en kallar
  // einnig á handleSentenceMutation sem býr til
  // raðir í Sentence töflunni
  // Það er endurkvæmni í newUser tilvikinu
  // Þannig safeguardinn kemur í veg fyrir endalaus loop.
  const handleQuestionMutation = (data, safeGuardCounter) => {
    console.log(safeGuardCounter)
    if (safeGuardCounter >= 2) return
    console.log(data)
    let inputData = { ...data, userId: currentUser.id, rating: 0 }
    if (currentUser.shadowBanned) {
      inputData = { ...inputData, isHidden: true }
    }
    console.log(inputData)
    const questionCreatedPromise = createQuestion({
      variables: {
        input: inputData,
      },
    })
    questionCreatedPromise
      .then((result) => {
        console.log(result.data.createQuestion.id)
        handleSentenceMutation(result.data.createQuestion.id)
      })
      .catch(() => {
        console.log(currentUser)
        console.log(new Date().toISOString())
        if (currentUser.roles === 'newUser') {
          // Höndla það að ef accountinn er eldri en 1 klst
          // þá á að breyta honum í venjulegan user sem getur postað
          console.log(
            timeBetweenTwoDateStringsInSeconds(
              currentUser.createdAt,
              new Date().toISOString()
            )
          )
          if (
            timeBetweenTwoDateStringsInSeconds(
              currentUser.createdAt,
              new Date().toISOString()
            ) > 3600
          ) {
            // Eldri en 1 klst
            console.log('User older than 1 hour')
            updateUser({
              variables: {
                input: { roles: 'user' },
                id: currentUser.id,
              },
            })
            console.log(currentUser)
            handleQuestionMutation(data, safeGuardCounter + 1) //! Endurkvæmni sem getur verið hættuleg:
          } else {
            // Yngri en 1 klst
            handleNewUser(currentUser)
          }
        }
      })
    console.log(questionCreatedPromise)
  }
  return (
    <>
      {/* flex-grow max-w-[700px] shadow-lg p-4 rounded-lg bg-white text-slate-500 */}
      <div className="flex shadow-lg gap-5 bg-white text-slate-500 p-5 rounded-lg border-2 font-bold text-xl max-w-[700px]">
        <div className="flex flex-col self-center">
          <h1 className=" self-center pb-2">Upplýsingar um spurningu</h1>
          <hr />
          <Form onSubmit={onSubmit}>
            <div className="flex flex-col items-end gap-2">
              <div className="flex flex-row gap-2">
                <p>Titill </p>
                <TextField
                  className="block"
                  placeholder="Titill"
                  name="title"
                />
              </div>
              <div className="flex flex-row gap-2">
                <p>Tungumál</p>
                <TextField
                  className="block"
                  placeholder="language"
                  name="language"
                />
              </div>
              <div className="flex flex-row gap-2">
                <p>Skilgreining</p>
                <TextField
                  className="block"
                  placeholder="definition"
                  name="definition"
                />
              </div>
              <div className="flex flex-row gap-2">
                <p>Aðrar upplýsingar</p>
                <TextField
                  className="block"
                  placeholder="other_info"
                  name="other_info"
                />
              </div>
              <div className="order-2">
                <Submit className=" bg-green-400 py-2 px-4 text-sm text-white rounded-lg ">
                  Submit
                </Submit>
              </div>
            </div>
          </Form>
        </div>
        {/*Setningar verða að vera hérna því plús takkinn kallar á onSubmit */}
        <div className="flex flex-col gap-2 flex-wrap">
          <h1 className="self-center pb-2">Setningar</h1>
          <hr />
          {list.map((item) => (
            <div className="flex gap-2 relative flex-wrap" key={item.listIndex}>
              <p>Setning {item.listIndex + 1}</p>
              <input
                placeholder={'sentence ' + (item.listIndex + 1)}
                name={item.listIndex}
                onChange={onChange}
              />
              <button
                className={listIndex === item.listIndex + 1 ? '' : 'hidden'}
                onClick={addSentence}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[100vh] bg-[#e6f3ff]"></div>
    </>
  )
}

export default NewQuestionForm
