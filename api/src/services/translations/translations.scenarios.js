export const standard = defineScenario({
  translation: {
    one: {
      data: {
        translation: 'String',
        answer: {
          create: {
            title: 'String',
            justification: 'String',
            user: {
              create: {
                email: 'String6387194',
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
                    email: 'String5434031',
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
        translation: 'String',
        answer: {
          create: {
            title: 'String',
            justification: 'String',
            user: {
              create: {
                email: 'String3551799',
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
                    email: 'String59936',
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
