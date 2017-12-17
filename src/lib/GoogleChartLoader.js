import { Component, createElement } from 'react'
import script from 'loadjs'
const e = createElement
// const script =
//   typeof window !== 'undefined'
//     ? require('loadjs')
//     : (link, { success: callback }) => callback()

export const loadRemoteScript = async () => {
  return new Promise((resolve, reject) =>
    script('https://www.gstatic.com/charts/loader.js', {
      success: resolve,
      error: reject
    })
  )
}

export const loadGoogleScripts = async ({ window }) => {
  try {
    if (window.google) return
    await loadRemoteScript()
  } catch (err) {
    console.error(
      `Could not load chart loader scripts from Google : ${err.message}`,
      err
    )
  }
}

export const loadGoogleCharts = ({ version, options, window }) => {
  window.google.charts.load(version, options)
  return new Promise(resolve => {
    window.google.charts.setOnLoadCallback(resolve)
  })
}

export const onMount = async ({ state, props, window }) => {
  try {
    await loadGoogleScripts({ window })
  } catch (err) {
    throw new Error(
      `Error Loading Google Script Loader in GoogleChartLoader onMount: ${
        err.message
      }`
    )
  }
  const { version, language, packages, mapsApiKey } = props
  try {
    await loadGoogleCharts({
      version,
      options: {
        language,
        packages,
        mapsApiKey
      },
      window
    })
  } catch (err) {
    throw new Error(
      `Error Loading Google Charts Scripts in GoogleChartLoader onMount: ${
        err.message
      }`
    )
  }
}

class GoogleChartLoader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      isLoading: false,
      hasErrored: false,
      errorMessage: null
    }
  }
  componentDidMount () {
    const { state, props } = this
    const { window } = props
    this.setState({ isLoading: true })
    onMount({ state, props, window })
      .then(() => {
        this.setState({ isLoading: false, isLoaded: true })
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          hasErrored: true,
          errorMessage: err.message
        })
      })
  }
  render () {
    const { props, state } = this
    const { isLoading, hasErrored, isLoaded } = state
    const { renderLoader, renderError, renderChart, children } = props
    return isLoading
      ? renderLoader({ props, state })
      : hasErrored
        ? renderError({ props, state })
        : isLoaded
          ? children || renderChart({ props, state })
          : renderError({ props, state })
  }
}

export const defaultProps = {
  packages: ['corechart'],
  version: 'current',
  language: 'en',
  mapsApiKey: null,
  renderLoader: props => e('div', null, 'Loading Chart.'),
  renderChart: props => e('div', null, 'Chart'),
  renderError: props => e('div', null, 'Error Loading Chart')
}

GoogleChartLoader.defaultProps = defaultProps

export { GoogleChartLoader }
export default GoogleChartLoader
