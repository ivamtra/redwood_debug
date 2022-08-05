/* eslint-disable no-case-declarations */
//TODO: Refactora
//TODO: ENUM fyrir tegund af component?
//TODO: CSS til að merkja hvort að takkinn hafi verið smelltur
import { useEffect, useLayoutEffect, useState } from 'react' //

import { BiUpArrow, BiDownArrow } from 'react-icons/bi'

import { useAuth } from '@redwoodjs/auth'
import { Submit, Form } from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { GraphQLMutations } from 'src/customUtils/GraphQLMutations'

import { QUERY as refetchAnswerQuery } from '../AnswerCell'
import { QUERY as refetchCommentQuery } from '../AnswerCommentCell'
import { QUERY as refetchQuestionQuery } from '../QuestionCell'

// ----------- UpdateRating fall ----------------------------------

// (int, int) => int
// Gefur töluna sem hækka/lækka á componentinn um
const calculateRatingDifference = (oldRating, newRating) => {
  if (oldRating === 0) {
    return newRating
  } else if (oldRating !== newRating) {
    return 2 * newRating
  } else {
    return -newRating
  }
}

// Talan sem fer í userLikesX
const newRating = (oldRating, newRating) => {
  if (oldRating === newRating) {
    return 0
  } else {
    return newRating
  }
}

const handleCatch = (workingData, rating) => {
  const ratingChange = calculateRatingDifference(workingData.action, rating)
  const newAction = newRating(workingData.action, rating)
  return [newAction, ratingChange]
}

// ------------------------------------------------------

// ------------ React Component ------------------------

const RatingButton = ({ type, id, compRating }) => {
  useEffect(() => console.log(rating))
  // ------------ OnCompleted ----------------------------

  const onCompleted = (type) => {}

  const initializeRating = () => {
    if (
      userLikesAnswerLoading ||
      userLikesCommentLoading ||
      userLikesQuestionLoading
    ) {
      return
    }
    console.log(userLikesAnswerData)
    console.log(userLikesCommentData)
    console.log(userLikesQuestionData)
    console.log(userLikesAnswerData.customUserLikesAnswer)
    console.log(userLikesCommentData.customUserLikesComment)
    console.log(userLikesQuestionData.customUserLikesQuestion)
    console.log(userLikesAnswerLoading)
    console.log(userLikesCommentLoading)
    console.log(userLikesQuestionLoading)
    const list = [
      userLikesAnswerData.customUserLikesAnswer,
      userLikesCommentData.customUserLikesComment,
      userLikesQuestionData.customUserLikesQuestion,
    ]
    list.forEach((item) => {
      console.log(item)
      if (item !== undefined) {
        if (item.length !== 0) {
          console.log(item.action)
          console.log({ action: item[0].action })
          setUIrating(item[0].action)
        }
      }
    })
  }

  useLayoutEffect(() => initializeRating())

  // ----------------- Variables ---------------------
  const { isAuthenticated, currentUser } = useAuth()
  const [UIrating, setUIrating] = useState(0)
  let rating = 0
  let debugUserId

  // Laga tilfellið þegar user er ekki loggaður inn
  if (!isAuthenticated) {
    debugUserId = 0
  } else {
    debugUserId = currentUser.id
  }

  // --------- DATABASE ------------------------------

  // -------------------------------------------------

  // CREATE
  const [createQuestionUpvote] = useMutation(
    GraphQLMutations.CREATE_QUESTION_UPVOTE,
    {
      refetchQueries: [
        {
          query: GraphQLMutations.USER_LIKES_QUESTION_QUERY,
          variables: {
            userId: debugUserId,
            questionId: id,
          },
        },
      ],
    }
  )
  const [createAnswerUpvote] = useMutation(
    GraphQLMutations.CREATE_ANSWER_UPVOTE,
    {
      refetchQueries: [
        {
          query: GraphQLMutations.USER_LIKES_ANSWER_QUERY,
          variables: {
            userId: debugUserId,
            answerId: id,
          },
        },
      ],
    }
  )
  const [createCommentUpvote] = useMutation(
    GraphQLMutations.CREATE_COMMENT_UPVOTE,
    {
      refetchQueries: [
        {
          query: GraphQLMutations.USER_LIKES_COMMENT_QUERY,
          variables: {
            userId: debugUserId,
            commentId: id,
          },
        },
      ],
    }
  )
  // -------------------------------

  // UPDATE

  // Components

  // Question
  const [updateQuestionRating] = useMutation(
    GraphQLMutations.UPDATE_QUESTION_RATING,
    {
      refetchQueries: [{ query: refetchQuestionQuery, variables: { id } }],
      onCompleted: () => {
        onCompleted('question')
      },
    }
  )

  // Answer
  const [UpdateAnswerRating] = useMutation(
    GraphQLMutations.UPDATE_ANSWER_RATING,
    {
      refetchQueries: [{ query: refetchAnswerQuery, variables: { id } }],
      onCompleted: () => onCompleted('answer'),
    }
  )

  // Comment
  const [UpdateCommentRating] = useMutation(
    GraphQLMutations.UPDATE_COMMENT_RATING,
    {
      refetchQueries: [{ query: refetchCommentQuery, variables: { id } }],
      onCompleted: () => onCompleted('comment'),
    }
  )

  // UserLikesX

  const [updateUserLikesQuestion] = useMutation(
    GraphQLMutations.UPDATE_USER_LIKES_QUESTION,
    {
      refetchQueries: [
        {
          query: GraphQLMutations.USER_LIKES_QUESTION_QUERY,
          variables: { userId: debugUserId, questionId: id },
        },
      ],
    }
  )

  const [updateUserLikesAnswer] = useMutation(
    GraphQLMutations.UPDATE_USER_LIKES_ANSWER,
    {
      refetchQueries: [
        {
          query: GraphQLMutations.USER_LIKES_ANSWER_QUERY,
          variables: { userId: debugUserId, answerId: id },
        },
      ],
    }
  )

  const [updateUserLikesComment] = useMutation(
    GraphQLMutations.UPDATE_USER_LIKES_COMMENT,
    {
      refetchQueries: [
        {
          query: GraphQLMutations.USER_LIKES_COMMENT_QUERY,
          variables: { userId: debugUserId, commentId: id },
        },
      ],
    }
  )
  // ------------------------------------------------

  // Component Queries

  // Question query
  const {
    data: questionData,
    loading: questionLoading,
    error: questionError,
  } = useQuery(GraphQLMutations.QUESTION_QUERY, {
    variables: { id },
  })

  // Answer query
  const {
    data: answerData,
    loading: answerLoading,
    error: answerError,
  } = useQuery(GraphQLMutations.ANSWER_QUERY, {
    variables: { id },
  })

  // Comment query
  const {
    data: commentData,
    loading: commentLoading,
    error: commentError,
  } = useQuery(GraphQLMutations.COMMENT_QUERY, {
    variables: { id },
  })
  // ------------------------------------------------

  // UserLikesX Queries

  const { data: userLikesQuestionData, loading: userLikesQuestionLoading } =
    useQuery(GraphQLMutations.USER_LIKES_QUESTION_QUERY, {
      variables: { questionId: id, userId: debugUserId },
    })

  const { data: userLikesAnswerData, loading: userLikesAnswerLoading } =
    useQuery(GraphQLMutations.USER_LIKES_ANSWER_QUERY, {
      variables: { answerId: id, userId: debugUserId },
    })

  const { data: userLikesCommentData, loading: userLikesCommentLoading } =
    useQuery(GraphQLMutations.USER_LIKES_COMMENT_QUERY, {
      variables: { commentId: id, userId: debugUserId },
    })

  // ------------------------------------------------

  // ---------- Click Events -------------------------

  const downvoteClick = () => {
    // Höndla útlitið
    UIrating === -1 ? setUIrating(0) : setUIrating(-1)

    // -----------------
    rating = -1
    console.log('downvoted')
    console.log(new Date().toISOString)
    handleCreateMutation()
  }

  const upvoteClick = () => {
    // Höndla útlitið
    UIrating === 1 ? setUIrating(0) : setUIrating(1)
    // -----------------
    rating = 1
    console.log('upvoted')
    handleCreateMutation()
  }

  // ------------------------------------------------

  // ------- Database Mutations ---------------------

  /*
    Höndlar það að búa til dálka í UserLikesX töflum
    og breytir rating hjá componentum
   */
  const handleCreateMutation = () => {
    const input = {
      userId: currentUser.id,
      action: rating,
      dateTime: new Date().toISOString(),
    }
    if (rating === 1 || rating === -1) {
      // Bæta við rating
      console.log(input)

      switch (type) {
        case 'answer':
          const answerInput = { ...input, answerId: id }
          console.log(answerInput)
          console.log(
            createAnswerUpvote({
              variables: { input: answerInput },
            })
              .then(() => {
                console.log(answerData)
                console.log(answerLoading)
                console.log(answerError)
                UpdateAnswerRating({
                  variables: {
                    input: { rating: answerData.answer.rating + rating },
                    id: id,
                  },
                })
              })
              .catch(() => {
                console.log(id)
                console.log(userLikesAnswerData)
                const workingData = userLikesAnswerData.customUserLikesAnswer[0]
                const [newAction, ratingChange] = handleCatch(
                  workingData,
                  rating
                )

                updateUserLikesAnswer({
                  variables: {
                    input: { action: newAction },
                    id: workingData.id,
                  },
                }).then(() => {
                  UpdateAnswerRating({
                    variables: {
                      input: {
                        rating: answerData.answer.rating + ratingChange,
                      },
                      id: id,
                    },
                  })
                })
              })
          )
          break
        case 'question':
          const questionInput = { ...input, questionId: id }
          console.log(
            createQuestionUpvote({
              variables: { input: questionInput },
            })
              .then(() => {
                console.log(questionData)
                console.log(questionLoading)
                console.log(questionError)
                updateQuestionRating({
                  variables: {
                    input: { rating: questionData.question.rating + rating },
                    id: id,
                  },
                })
              })
              .catch(() => {
                // Rating nú þegar til og verður að uppfæra
                console.log('In catch')

                // 1) Query-a eftir id-inu sem failaði (Gert í hook)

                console.log(userLikesQuestionData.customUserLikesQuestion[0])

                // 2) Breyta yfir í rétt form

                // {typeName, id, action}
                const workingData =
                  userLikesQuestionData.customUserLikesQuestion[0]

                // Gefa nýtt rating á component
                const [newAction, ratingChange] = handleCatch(
                  workingData,
                  rating
                )

                // ) Updata rating-ið

                updateUserLikesQuestion({
                  variables: {
                    input: { action: newAction },
                    id: workingData.id,
                  },
                }).then(() => {
                  updateQuestionRating({
                    variables: {
                      input: {
                        rating: questionData.question.rating + ratingChange,
                      },
                      id: id,
                    },
                  })
                })
              })
          )
          break
        case 'comment':
          const commentInput = { ...input, commentId: id }
          console.log(commentInput)
          console.log(
            createCommentUpvote({
              variables: { input: commentInput },
            })
              .then(() => {
                UpdateCommentRating({
                  variables: {
                    input: {
                      rating: commentData.answerComment.rating + rating,
                    },
                    id: id,
                  },
                })
              })
              .catch(() => {
                const workingData =
                  userLikesCommentData.customUserLikesComment[0]
                console.log(workingData)
                const [newAction, ratingChange] = handleCatch(
                  workingData,
                  rating
                )

                updateUserLikesComment({
                  variables: {
                    input: { action: newAction },
                    id: workingData.id,
                  },
                }).then(() => {
                  UpdateCommentRating({
                    variables: {
                      input: {
                        rating: commentData.answerComment.rating + ratingChange,
                      },
                      id: id,
                    },
                  })
                })
              })
          )
          break
        default:
          //Throw exception
          console.log('No type')
      }
    }
  }

  // ------- React UI ----------------------------

  return (
    <>
      <div className="flex flex-col justify-items-center align-middle">
        <Form onSubmit={handleCreateMutation}>
          <Submit className="blue" onClick={upvoteClick}>
            <div className="hover:scale-125 cursor-pointer">
              <BiUpArrow color={UIrating === 1 ? 'red' : ''} />
            </div>
          </Submit>
          <p className="">{compRating}</p>
          <Submit onClick={downvoteClick}>
            <div className="hover:scale-125 cursor-pointer">
              <BiDownArrow color={UIrating === -1 ? '#2a8af7' : ''} />
            </div>
          </Submit>
        </Form>
      </div>
    </>
  )
}

export default RatingButton
