// DOCS
import { Component } from 'react'

class DataTableCell extends Component {
  componentDidUpdate (prevProps) {}
  render () {
    return null
  }
}
DataTableCell.defaultProps = {
  v: '', // [Optional] The cell value. The data type should match the column data type
  f: '', // [Optional] A string version of the v value,
  p: {} // [Optional] An object that is a map of custom values applied to the cell. These values can be of any JavaScript type
}

class DataTableColumn extends Component {
  componentDidUpdate (prevProps) {}
  render () {
    return null
  }
}
DataTableColumn.defaultProps = {
  type: 'string', // [Required] Data type of the data in the column. Supports : [boolean, number, string, date, datetime, timeofday]
  id: '', // [Optional] String ID of the column. Must be unique in the table.
  label: '', // [Optional]  String value that some visualizations display for this column
  pattern: '', // [Optional]
  p: {}, // [Optional] An object that is a map of custom values applied to the cell. These values can be of any JavaScript type
  dataTable: {}
}

class DataTableRow extends Component {
  componentDidUpdate (prevProps) {}
  render () {
    return null
  }
}

DataTableRow.defaultProps = {
  c: [], // [Required] array of cells in that row
  p: {}, // [Optional] map of arbitrary custom values to assign to the whole row
  dataTable: {}
}

// Reference + Docs: https://developers.google.com/chart/interactive/docs/reference#dataparam
class DataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lastUpdatedOn: Date.now()
    }
  }
  componentDidMount () {
    const { cols, rows, p, window } = this.props
    this.dataTable = new window.google.visualization.DataTable({
      cols,
      rows,
      p
    })
  }
  componentDidUpdate () {
    const { cols, rows, p } = this.props
    this.dataTable = new window.google.visualization.DataTable({
      cols,
      rows,
      p
    })
  }
  render () {
    const { cols, rows, p, window } = this.props
    return null
  }
}

DataTable.defaultProps = {
  cols: [],
  rows: [],
  p: {}
}
export default DataTable
