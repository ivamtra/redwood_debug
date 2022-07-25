import { db } from 'src/lib/db'

export const testNotifications = () => {
  return db.testNotification.findMany()
}

export const testNotification = ({ id }) => {
  return db.testNotification.findUnique({
    where: { id },
  })
}

export const createTestNotification = ({ input }) => {
  return db.testNotification.create({
    data: input,
  })
}

export const updateTestNotification = ({ id, input }) => {
  return db.testNotification.update({
    data: input,
    where: { id },
  })
}

export const deleteTestNotification = ({ id }) => {
  return db.testNotification.delete({
    where: { id },
  })
}

export const TestNotification = {
  user: (_obj, { root }) =>
    db.testNotification.findUnique({ where: { id: root.id } }).user(),
}
