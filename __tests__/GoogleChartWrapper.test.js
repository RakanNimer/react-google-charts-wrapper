global.requestAnimationFrame = callback => {
  setTimeout(callback, 0)
}
global.window.google = {
  visualization: {
    ChartWrapper: jest.fn(() => ({ draw: jest.fn() }))
  }
}
const React = require('react')
const {
  default: GoogleChartWrapper
} = require('../src/lib/google-visualization/ChartWrapper')
const { default: Events } = require('../src/lib/google-visualization/Events')

const { GoogleChartLoader } = require('../src/lib/GoogleChartLoader')

const ChartWrapper = props => {
  return (
    <GoogleChartWrapper
      {...props}
      render={(props, chartWrapper) => {
        return (
          <Events
            chartWrapper={chartWrapper}
            onReady={(...args) => console.log('onReady', args)}
            onError={(...args) => console.log('onError', args)}
            onSelect={(...args) => console.log('onSelect', args)}
          />
        )
      }}
    />
  )
}
const renderer = require('react-test-renderer')
const { createElement } = require('react')
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const { mount } = Enzyme
Enzyme.configure({ adapter: new Adapter() })

const dataTable = [['', { label: 'Germany' }, 'Brazil'], ['', 300, 400]]

describe('ChartWrapper', () => {
  test('exports', () => {
    expect(ChartWrapper).toMatchSnapshot()
  })
  test(`doesn't throw`, () => {
    const Chart = () =>
      createElement(ChartWrapper, {
        chartType: 'ColumnChart',
        dataTable
      })
    expect(() => Chart()).not.toThrow()
    const RenderedChart = renderer.create(Chart())
    expect(RenderedChart).toMatchSnapshot()
    expect(
      global.window.google.visualization.ChartWrapper.mock
    ).toMatchSnapshot()
  })
  test('mounts', () => {
    const Chart = () =>
      createElement(ChartWrapper, { chartType: 'ColumnChart', dataTable })
    const RenderedChart = mount(Chart())
    expect(RenderedChart.props()).toMatchSnapshot()
  })
})
