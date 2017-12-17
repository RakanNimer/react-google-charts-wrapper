const is = require('is')
const {
  loadGoogleCharts,
  loadGoogleScripts
} = require('../../src/lib/GoogleChartLoader')

describe('loadGoogleCharts', () => {
  test('exports', () => {
    expect(is.function(loadGoogleCharts)).toBe(true)
  })
  test('doesnt throw', async () => {
    expect(async () => {
      await loadGoogleScripts({ window })
      await loadGoogleCharts({ window })
    }).not.toThrow()
  })
})
