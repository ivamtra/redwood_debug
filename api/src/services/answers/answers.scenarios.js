export const standard = defineScenario({
  answer: {
    one: {
      data: {
        title: 'String',
        justification: 'String',
        user: {
          create: {
            email: 'String6737124',
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
                email: 'String3082449',
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
        title: 'String',
        justification: 'String',
        user: {
          create: {
            email: 'String390491',
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
                email: 'String5226016',
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
