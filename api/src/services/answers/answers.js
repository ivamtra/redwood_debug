import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

import { CREATE_QUESTION_ROLES as CreateAnswerRoles } from '../questions/questions'

export const answers = ({ questionId }) => {
  return db.answer.findMany({
    where: { questionId },
    orderBy: {
      id: 'desc',
    },
  })
}

export const answer = ({ id }) => {
  return db.answer.findUnique({
    where: { id },
  })
}

export const createAnswer = ({ input }) => {
  requireAuth({ roles: CreateAnswerRoles })
  return db.answer.create({
    data: input,
  })
}

export const updateAnswer = ({ id, input }) => {
  return db.answer.update({
    data: input,
    where: { id },
  })
}

export const deleteAnswer = ({ id }) => {
  return db.answer.delete({
    where: { id },
  })
}

export const Answer = {
  user: (_obj, { root }) =>
    db.answer.findUnique({ where: { id: root.id } }).user(),
  question: (_obj, { root }) =>
    db.answer.findUnique({ where: { id: root.id } }).question(),
  UserLikesAnswer: (_obj, { root }) =>
    db.answer.findUnique({ where: { id: root.id } }).UserLikesAnswer(),
  AnswerComment: (_obj, { root }) =>
    db.answer.findUnique({ where: { id: root.id } }).AnswerComment(),
  translations: (_obj, { root }) =>
    db.answer.findUnique({ where: { id: root.id } }).translations(),
  Issue: (_obj, { root }) =>
    db.answer.findUnique({ where: { id: root.id } }).Issue(),
}
