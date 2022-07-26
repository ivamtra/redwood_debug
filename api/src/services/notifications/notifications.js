import { db } from 'src/lib/db'

export const notifications = ({ userId }) => {
  return db.notification.findMany({
    where: { userId },
    orderBy: {
      id: 'desc',
    },
  })
}

export const notification = ({ id }) => {
  return db.notification.findUnique({
    where: { id },
  })
}

export const createNotification = ({ input }) => {
  return db.notification.create({
    data: input,
  })
}

export const updateNotification = ({ id, input }) => {
  return db.notification.update({
    data: input,
    where: { id },
  })
}

export const deleteNotification = ({ id }) => {
  return db.notification.delete({
    where: { id },
  })
}

export const Notification = {
  question: (_obj, { root }) =>
    db.notification.findUnique({ where: { id: root.id } }).question(),
  answer: (_obj, { root }) =>
    db.notification.findUnique({ where: { id: root.id } }).answer(),
  answerComment: (_obj, { root }) =>
    db.notification.findUnique({ where: { id: root.id } }).answerComment(),
  user: (_obj, { root }) =>
    db.notification.findUnique({ where: { id: root.id } }).user(),
}
