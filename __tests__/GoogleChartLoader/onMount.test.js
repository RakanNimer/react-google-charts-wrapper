const is = require('is')
const { onMount, defaultProps } = require('../../src/lib/GoogleChartLoader')

describe('onMount', () => {
  test('exports', () => {
    expect(is.function(onMount)).toBe(true)
  })
  test('doesnt throw', async () => {
    expect(async () => {
      const state = {
        isLoaded: false,
        isLoading: false,
        hasErrored: false,
        errorMessage: null
      }
      const props = defaultProps
      await onMount({ window, state, props })
    }).not.toThrow()
  })
})
