import { db } from 'src/lib/db'

export const farts = () => {
  return db.fart.findMany()
}

export const fart = ({ id }) => {
  return db.fart.findUnique({
    where: { id },
  })
}

export const createFart = ({ input }) => {
  return db.fart.create({
    data: input,
  })
}

export const updateFart = ({ id, input }) => {
  return db.fart.update({
    data: input,
    where: { id },
  })
}

export const deleteFart = ({ id }) => {
  return db.fart.delete({
    where: { id },
  })
}

export const Fart = {
  question: (_obj, { root }) =>
    db.fart.findUnique({ where: { id: root.id } }).question(),
  answer: (_obj, { root }) =>
    db.fart.findUnique({ where: { id: root.id } }).answer(),
  answerComment: (_obj, { root }) =>
    db.fart.findUnique({ where: { id: root.id } }).answerComment(),
  user: (_obj, { root }) =>
    db.fart.findUnique({ where: { id: root.id } }).user(),
}
