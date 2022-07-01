import { db } from 'src/lib/db'

export const answerComments = ({ answerId }) => {
  return db.answerComment.findMany({ where: { answerId } })
}

export const answerComment = ({ id }) => {
  return db.answerComment.findUnique({
    where: { id },
  })
}

export const answerCommentsByAnswerId = ({ answerId }) => {
  return db.answerComment.findMany({ where: { answerId } })
}

export const createAnswerComment = ({ input }) => {
  return db.answerComment.create({
    data: input,
  })
}

export const updateAnswerComment = ({ id, input }) => {
  return db.answerComment.update({
    data: input,
    where: { id },
  })
}

export const deleteAnswerComment = ({ id }) => {
  return db.answerComment.delete({
    where: { id },
  })
}

export const AnswerComment = {
  user: (_obj, { root }) =>
    db.answerComment.findUnique({ where: { id: root.id } }).user(),
  answer: (_obj, { root }) =>
    db.answerComment.findUnique({ where: { id: root.id } }).answer(),
  Issue: (_obj, { root }) =>
    db.answerComment.findUnique({ where: { id: root.id } }).Issue(),
  UserLikesComment: (_obj, { root }) =>
    db.answerComment.findUnique({ where: { id: root.id } }).UserLikesComment(),
}
