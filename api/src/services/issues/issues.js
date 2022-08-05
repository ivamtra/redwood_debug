import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

const GET_ISSUE_ROLES = ['admin', 'moderator']

export const issues = () => {
  requireAuth({ role: GET_ISSUE_ROLES })
  return db.issue.findMany({
    orderBy: {
      id: 'desc',
    },
  })
}

export const issue = ({ id }) => {
  requireAuth({ role: GET_ISSUE_ROLES })
  return db.issue.findUnique({
    where: { id },
  })
}

export const createIssue = ({ input }) => {
  return db.issue.create({
    data: input,
  })
}

export const updateIssue = ({ id, input }) => {
  return db.issue.update({
    data: input,
    where: { id },
  })
}

export const deleteIssue = ({ id }) => {
  return db.issue.delete({
    where: { id },
  })
}

export const Issue = {
  question: (_obj, { root }) =>
    db.issue.findUnique({ where: { id: root.id } }).question(),
  answer: (_obj, { root }) =>
    db.issue.findUnique({ where: { id: root.id } }).answer(),
  answerComment: (_obj, { root }) =>
    db.issue.findUnique({ where: { id: root.id } }).answerComment(),
  user: (_obj, { root }) =>
    db.issue.findUnique({ where: { id: root.id } }).user(),
}
