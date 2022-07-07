import { db } from 'api/src/lib/db'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    // -------------------------------------------------------------------

    // --------- USER ------------------------------------------------------
    const userData = [
      {
        id: 0,
        email: 'Placeholder',
        hashedPassword: 'Placeholder',
        salt: 'salt',
      },
      {
        id: 1,
        email: 'ivan',
        hashedPassword:
          'f01d1e7dc3eff50d1addc98cd59197d9b65833495704f8083a8eb3994630f41e',
        salt: 'b8c776ee8e770532d01c1a913bf69553',
      },
      { email: 'test', hashedPassword: 'asdasdjkasdffasdjk', salt: 'ASDA' },
    ]
    // --------- QUESTION ------------------------------------------------------
    const questionData = [
      {
        id: 0,
        title: 'Placeholder',
        language: 'Placehodler',
        definition: 'Placeholder',
        userId: 0,
        rating: 0,
      },
      {
        id: 1,
        title: 'Spurning 1',
        language: 'enska',
        definition: 'Skilgreining',
        userId: 1,
        rating: 0,
      },
    ]

    // --------- ANSWER ------------------------------------------------------
    const answerData = [
      {
        id: 0,
        title: 'Placeholder',
        justification: 'Placeholder',
        userId: 0,
        questionId: 0,
        rating: 0,
      },
      {
        id: 5,
        title: 'Comment test answer',
        justification: 'Comment test',
        userId: 1,
        questionId: 1,
        rating: 0,
      },
    ]

    // --------- COMMENT -----------------------------------------------------

    const commentData = [
      {
        id: 0,
        body: 'placeholder',
        userId: 0,
        parentId: 0,
        answerId: 0,
        level: 0,
        rating: 0,
      },
      {
        body: 'First comment!',
        userId: 1,
        parentId: 0,
        answerId: 5,
        level: 0,
        rating: 0,
      },
    ]

    // -----------------------------------------------------------------------

    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    Promise.all(
      //
      // Change to match your data model and seeding needs
      //
      userData.map(async (data) => {
        const record = await db.user.create({ data })
        console.log(record)
      })
    )
      .then(() => {
        questionData.map(async (data) => {
          const record = await db.question.create({ data })
          console.log(record)
        })
      })
      .then(() => {
        answerData.map(async (data) => {
          const record = await db.answer.create({ data })
          console.log(record)
        })
      })
      .then(() => {
        commentData.map(async (data) => {
          const record = await db.answerComment.create({ data })
          console.log(record)
        })
      })
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}

// questionData.map(async (data) => {
//   const record = await db.question.create({ data })
//   console.log(record)
// }),

// answerData.map(async (data) => {
//   const record = await db.answer.create({ data })
//   console.log(record)
// }),

// commentData.map(async (data) => {
//   const record = await db.answerComment.create({ data })
//   console.log(record)
// })
