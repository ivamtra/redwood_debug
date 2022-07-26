import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Submit, Form, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { timeBetweenTwoDateStringsInSeconds } from 'src/customUtils/DateUtils'

import { CREATE_NOTIFICATION } from '../AnswerCommentForm/AnswerCommentForm'
import { UPDATE_USER, handleNewUser } from '../NewQuestionForm/NewQuestionForm'
//-------------- Database --------------------------------------------

//-------------- Create Answer og Translation -------------------------

const notificationBody = (res) => {
  // user x svaraði spurningu þinni
  return 'User ' + res.data.createAnswer.userId + ' svaraði spurningu þinni'
}

const CREATE_ANSWER = gql`
  mutation CreateAnswerMutation($input: CreateAnswerInput!) {
    createAnswer(input: $input) {
      id #answerId sendanda
      createdAt
      question {
        userId # userId viðtakanda
      }
      userId #userId sendanda
    }
  }
`
// => Sem fer í þetta statement
const CREATE_TRANSLATION = gql`
  mutation CreateTranslationMutation($input: CreateTranslationInput!) {
    createTranslation(input: $input) {
      id
    }
  }
`

const AnswerForm = ({ questionId }) => {
  const [createNotification] = useMutation(CREATE_NOTIFICATION)
  const [createAnswer] = useMutation(CREATE_ANSWER, {
    onCompleted: () => toast.success('svar móttekið'),
  })
  const [createTranslation] = useMutation(CREATE_TRANSLATION, {
    onCompleted: () => toast.success('Þýðing móttekin'),
  })
  const { currentUser } = useAuth()
  const [textValue, setTextValue] = useState('')
  const [updateUser] = useMutation(UPDATE_USER)

  const [list, setList] = useState([
    { listIndex: 0, translation: 'placeholder', answerId: 0 },
  ])
  const [listIndex, setListIndex] = useState(1)

  const addTranslation = () => {
    setListIndex(listIndex + 1)
    let tempArray = [...list]
    tempArray.push({
      listIndex: listIndex,
      translation: textValue,
      answerId: 0,
    })
    setList(tempArray)
    console.log(list)
  }

  const onChange = (e) => setTextValue(e.target.value)

  const onSubmit = (answerData) => {
    handleAnswerMutation(answerData, 0)
  }

  const handleTranslationMutation = (answerId) => {
    setListIndex(listIndex + 1)
    let finalArray = [...list]
    finalArray.shift()
    finalArray.push({
      listIndex: listIndex,
      translation: textValue,
      answerId: 0,
    })

    // Athuga duplicate/ eða tómt í síðasta
    if (finalArray.length >= 2) {
      const n = finalArray.length
      if (
        finalArray[n - 1].translation === finalArray[n - 2].translation ||
        finalArray[n - 1].translation === ''
      ) {
        finalArray.pop()
      }
    }
    console.log(finalArray)

    // Bæta hverja setningu við gagnagrunninn
    finalArray.forEach((item) => {
      // Bæta við answerId úr createAnswer
      console.log(answerId)
      const inputData = { translation: item.translation, answerId: answerId }
      console.log(inputData)
      // Setja hana í gagnagrunninn
      createTranslation({
        variables: {
          input: inputData,
        },
      })
    })
  }

  const handleNotificationMutation = (res) => {
    console.log('In handle Notification')
    console.log(notificationBody(res))
    console.log(res)
    console.log(res.data.createAnswer.question.userId)
    const notificationInput = {
      body: notificationBody(res),
      questionId: 0,
      answerId: res.data.createAnswer.id,
      answerCommentId: 0,
      isSeen: false,
      userId: res.data.createAnswer.question.userId, //Id viðtakanda
    }
    console.log(notificationInput)
    console.log(createNotification({ variables: { input: notificationInput } }))
  }

  const handleAnswerMutation = (data, safeGuardCounter) => {
    console.log(safeGuardCounter)
    if (safeGuardCounter >= 2) return
    console.log(data)
    let inputData = {
      ...data,
      userId: currentUser.id,
      questionId: questionId,
      rating: 0,
    }
    if (currentUser.shadowBanned) {
      inputData = { ...inputData, isHidden: true }
    }
    const answerCreatedPromise = createAnswer({
      variables: {
        input: inputData,
      },
    })
    console.log(answerCreatedPromise)
    answerCreatedPromise
      .then((result) => {
        handleNotificationMutation(result)
        handleTranslationMutation(result.data.createAnswer.id)
        console.log(result)
      })
      .catch(() => {
        console.log(currentUser)
        if (currentUser.roles === 'newUser') {
          console.log(new Date().toISOString())
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
            handleAnswerMutation(data, safeGuardCounter + 1) //! Endurkvæmni sem getur verið hættuleg:
          } else {
            handleNewUser(currentUser)
          }
        }
      })
  }
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <TextField placeholder="title" name="title" /> <br />
        <TextField placeholder="justification" name="justification" /> <br />
        <Submit>Submit</Submit>
      </Form>

      <div>
        {list.map((item) => (
          <div key={item.listIndex}>
            <input
              placeholder={'translation' + listIndex}
              name={item.listIndex}
              onChange={onChange}
            />
            <button onClick={addTranslation}>+</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnswerForm
