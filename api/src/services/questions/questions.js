import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const CREATE_QUESTION_ROLES = ['admin', 'moderator', 'user']

export const questions = () => {
  return db.question.findMany({
    orderBy: {
      id: 'desc',
    },
  })
}

export const question = ({ id }) => {
  return db.question.findUnique({
    where: { id },
  })
}

export const createQuestion = ({ input }) => {
  requireAuth({ roles: CREATE_QUESTION_ROLES })
  return db.question.create({
    data: input,
  })
}

export const updateQuestion = ({ id, input }) => {
  return db.question.update({
    data: input,
    where: { id },
  })
}

export const deleteQuestion = ({ id }) => {
  return db.question.delete({
    where: { id },
  })
}

export const Question = {
  user: (_obj, { root }) =>
    db.question.findUnique({ where: { id: root.id } }).user(),
  Sentence: (_obj, { root }) =>
    db.question.findUnique({ where: { id: root.id } }).Sentence(),
  Answer: (_obj, { root }) =>
    db.question.findUnique({ where: { id: root.id } }).Answer(),
  UserLikesQuestion: (_obj, { root }) =>
    db.question.findUnique({ where: { id: root.id } }).UserLikesQuestion(),
  Issue: (_obj, { root }) =>
    db.question.findUnique({ where: { id: root.id } }).Issue(),
  QuestionIsInCategory: (_obj, { root }) =>
    db.question.findUnique({ where: { id: root.id } }).QuestionIsInCategory(),
}
