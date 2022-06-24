export const standard = defineScenario({
  userLikesComment: {
    one: {
      data: {
        action: 1746404,
        questionId: 9133444,
        user: {
          create: {
            email: 'String1438705',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        answerComment: {
          create: {
            body: 'String',
            user: {
              create: {
                email: 'String8295777',
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
                    email: 'String6958614',
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
                        email: 'String3170491',
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
        action: 1714158,
        questionId: 5617603,
        user: {
          create: {
            email: 'String6025054',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        answerComment: {
          create: {
            body: 'String',
            user: {
              create: {
                email: 'String2607434',
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
                    email: 'String7347239',
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
                        email: 'String1706963',
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
