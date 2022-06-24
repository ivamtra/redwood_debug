export const standard = defineScenario({
  sentence: {
    one: {
      data: {
        sentence: 'String',
        question: {
          create: {
            title: 'String',
            language: 'String',
            definition: 'String',
            user: {
              create: {
                email: 'String4714875',
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
        sentence: 'String',
        question: {
          create: {
            title: 'String',
            language: 'String',
            definition: 'String',
            user: {
              create: {
                email: 'String6330900',
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
