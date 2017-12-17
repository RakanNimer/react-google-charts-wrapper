import { Component } from 'react'

// Reference + Docs: https://developers.google.com/chart/interactive/docs/reference#constructor_3
class VizEvents extends Component {
  componentDidMount () {
    this.unbindVizEvents(this.props)
    this.bindVizEvents(this.props)
  }
  componentDidUpdate () {
    this.unbindVizEvents(this.props)
    this.bindVizEvents(this.props)
  }
  componentWillUnmount () {
    const { chartWrapper } = this.props
    console.log({ chartWrapperMount: chartWrapper })
    window.google.visualization.events.removeAllListeners(chartWrapper)
  }
  render () {
    const { render } = this.props
    return render(this.props, this.chartWrapper)
  }
  unbindVizEvents (props) {
    const { chartWrapper } = props
    if (chartWrapper === null) return
    window.google.visualization.events.removeAllListeners(chartWrapper)
  }
  bindVizEvents (props) {
    const { chartWrapper, onReady, onError, onSelect } = props
    if (chartWrapper === null) return

    if (onReady !== null) {
      window.google.visualization.events.addListener(
        chartWrapper,
        'ready',
        () => {
          onReady(chartWrapper)
        }
      )
    }
    if (onError !== null) {
      window.google.visualization.events.addListener(
        chartWrapper,
        'error',
        () => {
          onError(chartWrapper)
        }
      )
    }
    if (onSelect !== null) {
      window.google.visualization.events.addListener(
        chartWrapper,
        'select',
        (...args) => {
          onSelect(chartWrapper, args)
        }
      )
    }
  }
}

VizEvents.defaultProps = {
  chartWrapper: null,
  onReady: null,
  onError: null,
  onSelect: null,
  render: (props, chartWrapper) => {
    return props.children || null
  }
}
export default VizEvents
