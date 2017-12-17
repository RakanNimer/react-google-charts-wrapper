// For React 16+
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0)
}

const renderer = require('react-test-renderer')
const is = require('is')
const { createElement } = require('react')
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const { GoogleChartLoader } = require('../../src/lib/GoogleChartLoader')

Enzyme.configure({ adapter: new Adapter() })

const { mount } = Enzyme
describe('GoogleChartLoader', () => {
  test('exports', () => {
    expect(is.function(GoogleChartLoader)).toBe(true)
  })
  test('doesnt throw', async () => {
    expect(() =>
      renderer.create(createElement(GoogleChartLoader, { window }, null))
    ).not.toThrow()
  })
  test('mounts', () => {
    const chartType = 'ColumnChart'
    const dataTable = [[]]
    const el = createElement(
      GoogleChartLoader,
      {
        chartType,
        dataTable,
        window,
        renderChart: ({ props, state }) => {
          return createElement('div', props, null)
        }
      },
      null
    )
    const wrapper = mount(el)
    expect(wrapper.props().window).toBeDefined()
    expect(wrapper.props().chartType).toBeDefined()
    expect(wrapper.props().dataTable).toBeDefined()
  })
})
