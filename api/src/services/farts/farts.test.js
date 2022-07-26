import { farts, fart, createFart, updateFart, deleteFart } from './farts'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('farts', () => {
  scenario('returns all farts', async (scenario) => {
    const result = await farts()

    expect(result.length).toEqual(Object.keys(scenario.fart).length)
  })

  scenario('returns a single fart', async (scenario) => {
    const result = await fart({ id: scenario.fart.one.id })

    expect(result).toEqual(scenario.fart.one)
  })

  scenario('creates a fart', async (scenario) => {
    const result = await createFart({
      input: { body: 'String', isSeen: true, userId: scenario.fart.two.userId },
    })

    expect(result.body).toEqual('String')
    expect(result.isSeen).toEqual(true)
    expect(result.userId).toEqual(scenario.fart.two.userId)
  })

  scenario('updates a fart', async (scenario) => {
    const original = await fart({ id: scenario.fart.one.id })
    const result = await updateFart({
      id: original.id,
      input: { body: 'String2' },
    })

    expect(result.body).toEqual('String2')
  })

  scenario('deletes a fart', async (scenario) => {
    const original = await deleteFart({ id: scenario.fart.one.id })
    const result = await fart({ id: original.id })

    expect(result).toEqual(null)
  })
})
