// Define your own mock data here:
const user = { email: 'ivan', id: 3 }
export const standard = () => {
  return {
    answerComment: {
      id: 1,
      answerId: 1,
      user: {
        email: 'ivan',
        id: '1',
      },
      body: 'Mjög lang og ítarlegt komment um af hverju þetta er áhugaverð spurning eða svar sem er flott',
      createdAt: 5000000000000,
      parentId: 1,
      level: 1,
      rating: 100,
    },
  }
}
