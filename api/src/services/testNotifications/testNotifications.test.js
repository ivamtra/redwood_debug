import {
  testNotifications,
  testNotification,
  createTestNotification,
  updateTestNotification,
  deleteTestNotification,
} from './testNotifications'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('testNotifications', () => {
  scenario('returns all testNotifications', async (scenario) => {
    const result = await testNotifications()

    expect(result.length).toEqual(Object.keys(scenario.testNotification).length)
  })

  scenario('returns a single testNotification', async (scenario) => {
    const result = await testNotification({
      id: scenario.testNotification.one.id,
    })

    expect(result).toEqual(scenario.testNotification.one)
  })

  scenario('creates a testNotification', async (scenario) => {
    const result = await createTestNotification({
      input: {
        body: 'String',
        createdAt: '2022-07-25T22:11:32Z',
        userId: scenario.testNotification.two.userId,
      },
    })

    expect(result.body).toEqual('String')
    expect(result.createdAt).toEqual('2022-07-25T22:11:32Z')
    expect(result.userId).toEqual(scenario.testNotification.two.userId)
  })

  scenario('updates a testNotification', async (scenario) => {
    const original = await testNotification({
      id: scenario.testNotification.one.id,
    })

    const result = await updateTestNotification({
      id: original.id,
      input: { body: 'String2' },
    })

    expect(result.body).toEqual('String2')
  })

  scenario('deletes a testNotification', async (scenario) => {
    const original = await deleteTestNotification({
      id: scenario.testNotification.one.id,
    })

    const result = await testNotification({ id: original.id })

    expect(result).toEqual(null)
  })
})
