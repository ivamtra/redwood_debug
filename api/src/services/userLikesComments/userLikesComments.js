import { db } from 'src/lib/db'

export const userLikesComments = () => {
  return db.userLikesComment.findMany()
}

export const userLikesComment = ({ id }) => {
  return db.userLikesComment.findUnique({
    where: { id },
  })
}

export const customUserLikesComment = ({ commentId, userId }) => {
  return db.userLikesComment.findMany({
    where: {
      AND: [
        {
          commentId: commentId,
        },
        {
          userId: userId,
        },
      ],
    },
  })
}

export const createUserLikesComment = ({ input }) => {
  return db.userLikesComment.create({
    data: input,
  })
}

export const updateUserLikesComment = ({ id, input }) => {
  return db.userLikesComment.update({
    data: input,
    where: { id },
  })
}

export const deleteUserLikesComment = ({ id }) => {
  return db.userLikesComment.delete({
    where: { id },
  })
}

export const UserLikesComment = {
  user: (_obj, { root }) =>
    db.userLikesComment.findUnique({ where: { id: root.id } }).user(),
  answerComment: (_obj, { root }) =>
    db.userLikesComment.findUnique({ where: { id: root.id } }).answerComment(),
}
