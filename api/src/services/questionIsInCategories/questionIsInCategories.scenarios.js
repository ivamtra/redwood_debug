export const standard = defineScenario({
  questionIsInCategory: {
    one: {
      data: {
        question: {
          create: {
            title: 'String',
            language: 'String',
            definition: 'String',
            user: {
              create: {
                email: 'String8601603',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },

        category: { create: { titill: 'String', litur: 'String' } },
      },
    },

    two: {
      data: {
        question: {
          create: {
            title: 'String',
            language: 'String',
            definition: 'String',
            user: {
              create: {
                email: 'String3861019',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },

        category: { create: { titill: 'String', litur: 'String' } },
      },
    },
  },
})
