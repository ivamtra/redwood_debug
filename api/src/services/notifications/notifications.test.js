import {
  notifications,
  notification,
  createNotification,
  updateNotification,
  deleteNotification,
} from './notifications'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('notifications', () => {
  scenario('returns all notifications', async (scenario) => {
    const result = await notifications()

    expect(result.length).toEqual(Object.keys(scenario.notification).length)
  })

  scenario('returns a single notification', async (scenario) => {
    const result = await notification({ id: scenario.notification.one.id })

    expect(result).toEqual(scenario.notification.one)
  })

  scenario('creates a notification', async (scenario) => {
    const result = await createNotification({
      input: {
        body: 'String',
        isSeen: true,
        userId: scenario.notification.two.userId,
      },
    })

    expect(result.body).toEqual('String')
    expect(result.isSeen).toEqual(true)
    expect(result.userId).toEqual(scenario.notification.two.userId)
  })

  scenario('updates a notification', async (scenario) => {
    const original = await notification({ id: scenario.notification.one.id })
    const result = await updateNotification({
      id: original.id,
      input: { body: 'String2' },
    })

    expect(result.body).toEqual('String2')
  })

  scenario('deletes a notification', async (scenario) => {
    const original = await deleteNotification({
      id: scenario.notification.one.id,
    })

    const result = await notification({ id: original.id })

    expect(result).toEqual(null)
  })
})
