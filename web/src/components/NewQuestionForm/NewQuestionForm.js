import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Submit, Form, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { timeBetweenTwoDateStringsInSeconds } from 'src/customUtils/DateUtils'

import { QUERY as UserQuery } from '../UserCell/UserCell'

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

const UPDATE_USER = gql`
  mutation UpdateUserMutation($input: UpdateUserInput!, $id: Int!) {
    updateUser(input: $input, id: $id) {
      id
      roles
    }
  }
`

//---------------- React Component ----------------------------------

const NewQuestionForm = () => {
  const [createQuestion] = useMutation(CREATE_QUESTION)
  const [createSentence] = useMutation(CREATE_SENTENCE)
  const { currentUser, hasRole } = useAuth()
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
    handleQuestionMutation(questionData)
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
  const handleQuestionMutation = (data) => {
    console.log(data)
    const inputData = { ...data, userId: currentUser.id, rating: 0 }
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
        toast.error('Try again')
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
            console.log('User older than 1 hour')
            updateUser({
              variables: {
                input: { roles: 'user' },
                id: currentUser.id,
              },
            })
            console.log(currentUser)
          }
        }
      })
    console.log(questionCreatedPromise)
  }
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <TextField placeholder="title" name="title" /> <br />
        <TextField placeholder="language" name="language" /> <br />
        <TextField placeholder="definition" name="definition" /> <br />
        <TextField placeholder="other_info" name="other_info" /> <br />
        <Submit>Submit</Submit>
      </Form>
      {/*Setningar verða að vera hérna því plús takkinn kallar á onSubmit */}
      <div>
        {list.map((item) => (
          <div key={item.listIndex}>
            <input
              placeholder={'sentence ' + listIndex}
              name={item.listIndex}
              onChange={onChange}
            />
            <button onClick={addSentence}>+</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewQuestionForm
