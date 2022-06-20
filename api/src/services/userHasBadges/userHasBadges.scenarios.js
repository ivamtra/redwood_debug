export const standard = defineScenario({
  userHasBadge: {
    one: {
      data: {
        user: {
          create: {
            email: 'String2546774',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        badge: {
          create: {
            imageUrl: 'String',
            title: 'String',
            description: 'String',
          },
        },
      },
    },

    two: {
      data: {
        user: {
          create: {
            email: 'String2264918',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        badge: {
          create: {
            imageUrl: 'String',
            title: 'String',
            description: 'String',
          },
        },
      },
    },
  },
})
