global.requestAnimationFrame = callback => {
  setTimeout(callback, 0)
}
global.window.google = {
  visualization: {
    ChartWrapper: jest.fn(() => ({
      draw: jest.fn(),
      setDataTable: jest.fn(),
      setChartType: jest.fn(),
      setContainerId: jest.fn(),
      setOptions: jest.fn()
    })),
    events: {
      removeAllListeners: jest.fn(),
      addListener: jest.fn()
    }
  }
}
const React = require('react')
const {
  default: GoogleChartWrapper
} = require('../src/lib/google-visualization/ChartWrapper')
const { default: Events } = require('../src/lib/google-visualization/Events')

const { GoogleChartLoader } = require('../src/lib/GoogleChartLoader')

const ChartWrapperWithEvents = props => {
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
const dataTable2 = [['', { label: 'Germany2' }, 'Brazil2'], ['', 100, 200]]
describe('ChartWrapper', () => {
  test('exports', () => {
    expect(ChartWrapperWithEvents).toMatchSnapshot()
  })
  test(`doesn't throw`, () => {
    const Chart = () =>
      createElement(ChartWrapperWithEvents, {
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
  test('lifecycle with events', () => {
    const RenderedChart = mount(
      <ChartWrapperWithEvents chartType={'ColumnChart'} dataTable={dataTable} />
    )
    expect(RenderedChart.props()).toMatchSnapshot()
    RenderedChart.setProps({ dataTable: dataTable2 })
    expect(RenderedChart.props()).toMatchSnapshot()
    expect(
      global.window.google.visualization.events.addListener.mock.calls
    ).toMatchSnapshot()
    RenderedChart.unmount()
    expect(
      global.window.google.visualization.events.removeAllListeners.mock.calls
    ).toMatchSnapshot()
  })
  test('lifecycle without events', () => {
    const RenderedChart = mount(
      <GoogleChartWrapper chartType={'ScatterChart'} dataTable={dataTable} />
    )
    RenderedChart.setProps({ dataTable: dataTable2 })
    expect(RenderedChart.html()).toMatchSnapshot()
    expect(
      global.window.google.visualization.events.addListener.mock.calls
    ).toMatchSnapshot()
    RenderedChart.unmount()
    expect(
      global.window.google.visualization.events.removeAllListeners.mock.calls
    ).toMatchSnapshot()
  })

  test('events and Loader', () => {
    const RenderedChart = mount(
      <GoogleChartLoader window={window}>
        <GoogleChartWrapper chartType={'ScatterChart'} dataTable={dataTable} />
      </GoogleChartLoader>
    )
    expect(RenderedChart.html()).toMatchSnapshot()
  })
})
