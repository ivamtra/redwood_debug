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
      body: 'body',
      createdAt: '234128',
      parentId: 1,
      level: 1,
      rating: 100,
    },
  }
}
