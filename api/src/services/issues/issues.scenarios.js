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
                email: 'String6419191',
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
                email: 'String4774991',
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
                    email: 'String593644',
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
                email: 'String3902007',
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
                    email: 'String1095942',
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
                        email: 'String7407074',
                        hashedPassword: 'String',
                        salt: 'String',
                      },
                    },
                  },
                },
              },
            },

            question: {
              create: {
                title: 'String',
                language: 'String',
                definition: 'String',
                user: {
                  create: {
                    email: 'String1962628',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },

        user: {
          create: {
            email: 'String5656718',
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
                email: 'String457536',
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
                email: 'String6138941',
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
                    email: 'String8298751',
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
                email: 'String1298396',
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
                    email: 'String6256796',
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
                        email: 'String8694371',
                        hashedPassword: 'String',
                        salt: 'String',
                      },
                    },
                  },
                },
              },
            },

            question: {
              create: {
                title: 'String',
                language: 'String',
                definition: 'String',
                user: {
                  create: {
                    email: 'String9623541',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },

        user: {
          create: {
            email: 'String7210549',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})
