const is = require('is')
const { loadRemoteScript } = require('../../src/lib/GoogleChartLoader')

describe('loadRemoteScript', () => {
  test('exports', () => {
    expect(is.function(loadRemoteScript)).toBe(true)
  })
  test('doesnt throw', async () => {
    expect(async () => {
      await loadRemoteScript()
    }).not.toThrow()
  })
})
