export const standard = defineScenario({
  userLikesComment: {
    one: {
      data: {
        action: 4585290,
        user: {
          create: {
            email: 'String2083746',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        answerComment: {
          create: {
            body: 'String',
            user: {
              create: {
                email: 'String3854321',
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
                    email: 'String5293170',
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
                        email: 'String9829567',
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
    },

    two: {
      data: {
        action: 334734,
        user: {
          create: {
            email: 'String946472',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        answerComment: {
          create: {
            body: 'String',
            user: {
              create: {
                email: 'String6654729',
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
                    email: 'String7742009',
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
                        email: 'String7231162',
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
    },
  },
})
