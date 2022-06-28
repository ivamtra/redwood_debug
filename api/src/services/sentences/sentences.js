import { db } from 'src/lib/db'

export const sentences = ({ questionId }) => {
  return db.sentence.findMany({ where: { questionId } })
}

export const sentence = ({ id }) => {
  return db.sentence.findUnique({
    where: { id },
  })
}

export const createSentence = ({ input }) => {
  return db.sentence.create({
    data: input,
  })
}

export const updateSentence = ({ id, input }) => {
  return db.sentence.update({
    data: input,
    where: { id },
  })
}

export const getSentences = ({ questionId }) => {
  return db.sentence.findMany({ where: { questionId } })
}

export const deleteSentence = ({ id }) => {
  return db.sentence.delete({
    where: { id },
  })
}

export const Sentence = {
  question: (_obj, { root }) =>
    db.sentence.findUnique({ where: { id: root.id } }).question(),
}
