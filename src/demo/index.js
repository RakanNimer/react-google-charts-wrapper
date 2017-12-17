import React, { createElement, Component } from 'react'
import ReactDOM from 'react-dom'

import GoogleChartLoader from '../lib/GoogleChartLoader'
import GoogleChart from '../lib/GoogleChart'
import ChartWrapper from '../lib/google-visualization/ChartWrapper'
import Events from '../lib/google-visualization/Events'

const e = createElement

const dataTable = [
  ['', { label: 'Germany', type: 'number' }, 'Brazil'],
  ['', 300, 400]
]

const App = props => {
  return (
    <GoogleChartLoader
      {...props}
      window={window}
      renderChart={({ props, state }) => {
        return (
          <ChartWrapper
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
      }}
    />
  )
}

class ReactiveApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chartType: 'ColumnChart',
      dataTable
    }
    let i = 0
    const intervalID = setInterval(() => {
      if (i > 10) clearInterval(intervalID)
      this.setState({
        dataTable: [['', { label: 'Germany' }, 'Brazil'], ['', 100 * i, 200]],
        chartType: i % 2 === 0 ? 'ScatterChart' : 'ColumnChart'
      })
      i += 1
    }, 1000)
  }
  render () {
    return (
      <App
        chartType={this.state.chartWrapper}
        dataTable={this.state.dataTable}
      />
    )
  }
}

ReactDOM.render(e(ReactiveApp), document.getElementById('demo-app'))
