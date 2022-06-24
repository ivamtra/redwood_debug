export const standard = defineScenario({
  userLikesQuestion: {
    one: {
      data: {
        action: 3808764,
        user: {
          create: {
            email: 'String7816799',
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
                email: 'String5956547',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },

    two: {
      data: {
        action: 6554913,
        user: {
          create: {
            email: 'String4921825',
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
                email: 'String9191049',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})
