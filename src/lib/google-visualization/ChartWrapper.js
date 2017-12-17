import React, { Component } from 'react'

// Reference + Docs: https://developers.google.com/chart/interactive/docs/reference#constructor_3
class ChartWrapper extends Component {
  componentDidMount () {
    const { chartType, dataTable, options, containerId } = this.props
    this.chartWrapper = new window.google.visualization.ChartWrapper({
      chartType,
      dataTable,
      options,
      containerId
    })
    this.chartWrapper.draw()
  }
  componentDidUpdate () {
    const { chartType, dataTable, options, containerId } = this.props
    this.chartWrapper.setDataTable(dataTable)
    this.chartWrapper.setChartType(chartType)
    this.chartWrapper.setContainerId(containerId)
    this.chartWrapper.setOptions(options)
    this.chartWrapper.draw()
  }
  render () {
    const { render, children } = this.props
    return (
      <div id={this.props.containerId}>
        {children || render(this.props, this.chartWrapper)}
      </div>
    )
  }
}

ChartWrapper.defaultProps = {
  chartType: 'ColumnChart',
  dataTable: [[]],
  options: {}, // https://developers.google.com/chart/interactive/docs/reference#google.visualization.drawchart
  containerId: 'vis_div',
  dataSourceUrl: '',
  query: '',
  refreshInterval: '',
  view: null,
  render: (props, chartWrapper) => null
}

export default ChartWrapper
