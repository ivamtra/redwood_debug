export const standard = defineScenario({
  answerComment: {
    one: {
      data: {
        body: 'String',
        user: {
          create: {
            email: 'String1836401',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        answer: {
          create: {
            title: 'String',
            justification: 'String',
            user: {
              create: {
                email: 'String7509549',
                hashedPassword: 'String',
                salt: 'String',
              },
            },

            question: {
              create: {
                title: 'String',
                language: 'String',
                definition: 'String',
                user: {
                  create: {
                    email: 'String1429540',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },

    two: {
      data: {
        body: 'String',
        user: {
          create: {
            email: 'String6021278',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        answer: {
          create: {
            title: 'String',
            justification: 'String',
            user: {
              create: {
                email: 'String2897525',
                hashedPassword: 'String',
                salt: 'String',
              },
            },

            question: {
              create: {
                title: 'String',
                language: 'String',
                definition: 'String',
                user: {
                  create: {
                    email: 'String1058711',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})
