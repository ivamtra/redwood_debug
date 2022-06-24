export const standard = defineScenario({
  userIsInGroup: {
    one: {
      data: {
        user: {
          create: {
            email: 'String2326130',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        group: { create: { name: 'String', imageUrl: 'String' } },
      },
    },

    two: {
      data: {
        user: {
          create: {
            email: 'String6665822',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        group: { create: { name: 'String', imageUrl: 'String' } },
      },
    },
  },
})
