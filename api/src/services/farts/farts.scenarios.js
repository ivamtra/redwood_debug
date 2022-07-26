export const standard = defineScenario({
  fart: {
    one: {
      data: {
        body: 'String',
        isSeen: true,
        question: {
          create: {
            title: 'String',
            language: 'String',
            definition: 'String',
            user: {
              create: {
                email: 'String6308967',
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
                email: 'String1977095',
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
                    email: 'String7762725',
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
                email: 'String1441902',
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
                    email: 'String6827489',
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
                        email: 'String1353909',
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
            email: 'String2800500',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },

    two: {
      data: {
        body: 'String',
        isSeen: true,
        question: {
          create: {
            title: 'String',
            language: 'String',
            definition: 'String',
            user: {
              create: {
                email: 'String3317102',
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
                email: 'String8311726',
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
                    email: 'String5668221',
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
                email: 'String6571011',
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
                    email: 'String3125364',
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
                        email: 'String5886919',
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
            email: 'String2030745',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})
