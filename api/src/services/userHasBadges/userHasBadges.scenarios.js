export const standard = defineScenario({
  userHasBadge: {
    one: {
      data: {
        user: {
          create: {
            email: 'String4761327',
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
            email: 'String176168',
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
