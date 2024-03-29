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
      {
        id: 2,
        email: 'test',
        hashedPassword: 'asdasdjkasdffasdjk',
        salt: 'ASDA',
      },
      {
        id: 3,
        email: 'admin',
        hashedPassword:
          'd0837ca0bdadc1d10c793292a5440b840a4cfbaf6e37da0c675f2fc9a2497107',
        salt: '20673fcd6c9c813ee3a037da0809fb3f',
      },
      {
        id: 4,
        email: 'moderator',
        hashedPassword:
          '653b6a461d86c070381dc773bc8dc5e9c14108b5267fbec0ec7615a94f7c29a0',
        salt: 'db4cca0d8840b936efc83189d3569410',
      },
    ]
    // --------- QUESTION ------------------------------------------------------
    const questionData = [
      {
        id: 0,
        title: 'Placeholder',
        language: 'Placeholder',
        definition: 'Placeholder',
        userId: 0,
        rating: 0,
        isHidden: true,
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
        isHidden: true,
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
        parentId: null,
        answerId: 0,
        questionId: 0,
        level: 0,
        rating: 0,
        isHidden: true,
      },
      {
        id: 1,
        body: 'First comment!',
        userId: 1,
        parentId: 0,
        answerId: 5,
        questionId: 0,
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
    /*    Promise.all(
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
 */
    for (const user of userData) {
      await db.user.upsert({
        where: { id: user.id },
        create: user,
        update: {},
      })

      console.log(`  Seeded "${user.email}"`)
    }
    for (const question of questionData) {
      await db.question.upsert({
        where: { id: question.id },
        create: question,
        update: {},
      })

      console.log(`  Seeded "${question.title}"`)
    }
    for (const answer of answerData) {
      await db.answer.upsert({
        where: { id: answer.id },
        create: answer,
        update: {},
      })

      console.log(`  Seeded "${answer.id}"`)
    }
    for (const answerComment of commentData) {
      await db.answerComment.upsert({
        where: { id: answerComment.id },
        create: answerComment,
        update: {},
      })

      console.log(`  Seeded "${answerComment.id}"`)
    }
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
