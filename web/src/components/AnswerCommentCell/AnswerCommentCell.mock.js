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
      questionId: 0,
    },
    question: {
      id: 0,
      title: 'Placeholder',
      language: 'Placeholder',
      definition: 'Placeholder',
      other_info: null,
      userId: 0,
      rating: 0,
      isHidden: true,
    },
    answer: {
      id: 6,
      title: 'Íslensk þýðing',
      justification:
        'Hér er langur og ítarlegur rökstuðningur yfir því af hverju mér finnst þetta vera góð þýðing',
      userId: 3,
      questionId: 4,
      rating: 0,
      isHidden: false,
    },
  }
}
