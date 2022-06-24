export const standard = defineScenario({
  issue: {
    one: {
      data: {
        description: 'String',
        question: {
          create: {
            title: 'String',
            language: 'String',
            definition: 'String',
            user: {
              create: {
                email: 'String4203718',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },

        answer: {
          create: {
            title: 'String',
            justification: 'String',
            user: {
              create: {
                email: 'String8272313',
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
                    email: 'String16806',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },

        answerComment: {
          create: {
            body: 'String',
            user: {
              create: {
                email: 'String7505281',
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
                    email: 'String8075553',
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
                        email: 'String7002202',
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

        user: {
          create: {
            email: 'String9598220',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },

    two: {
      data: {
        description: 'String',
        question: {
          create: {
            title: 'String',
            language: 'String',
            definition: 'String',
            user: {
              create: {
                email: 'String2002230',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },

        answer: {
          create: {
            title: 'String',
            justification: 'String',
            user: {
              create: {
                email: 'String9412979',
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
                    email: 'String1469894',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },

        answerComment: {
          create: {
            body: 'String',
            user: {
              create: {
                email: 'String6280255',
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
                    email: 'String4659213',
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
                        email: 'String735609',
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

        user: {
          create: {
            email: 'String5138695',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})
