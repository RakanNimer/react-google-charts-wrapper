const is = require('is')
const { loadGoogleScripts } = require('../../src/lib/GoogleChartLoader')

describe('loadGoogleScripts', () => {
  test('exports', () => {
    expect(is.function(loadGoogleScripts)).toBe(true)
  })
  test('doesnt throw', async () => {
    expect(async () => {
      await loadGoogleScripts({ window })
    }).not.toThrow()
  })
})
