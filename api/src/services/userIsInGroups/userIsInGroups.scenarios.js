export const standard = defineScenario({
  userIsInGroup: {
    one: {
      data: {
        user: {
          create: {
            email: 'String6078055',
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
            email: 'String6243232',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        group: { create: { name: 'String', imageUrl: 'String' } },
      },
    },
  },
})
