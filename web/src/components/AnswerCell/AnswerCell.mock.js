// Define your own mock data here:
export const standard = () => ({
  answer: {
    id: 6,
    title: 'Íslensk þýðing',
    justification:
      'Hér er langur og ítarlegur rökstuðningur yfir því af hverju mér finnst þetta vera góð þýðing',
    userId: 3,
    createdAt: '2022-08-03T12:32:29.025Z',
    questionId: 4,
    rating: 0,
    isHidden: false,
    user: {
      id: 3,
      email: 'admin',
      name: null,
      roles: 'admin',
      hashedPassword:
        'd0837ca0bdadc1d10c793292a5440b840a4cfbaf6e37da0c675f2fc9a2497107',
      salt: '20673fcd6c9c813ee3a037da0809fb3f',
      resetToken: null,
      resetTokenExpiresAt: null,
      imageUrl: null,
      shadowBanned: false,
    },
  },
})
