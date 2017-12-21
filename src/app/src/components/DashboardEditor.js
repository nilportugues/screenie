import React from 'react'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
import PageEditor from './PageEditor'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import '../../node_modules/font-awesome/css/font-awesome.css'

class DashboardEditor extends React.Component {
  static createNewPage = () => ({
    name: '',
    url: '',
    forceProxy: false,
    durationMs: '',
    ordinal: ''
  })

  static defaultProps = {
    name: '',
    pages: [DashboardEditor.createNewPage()]
  }

  static propTypes = {
    name: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.object),
    onDashboardChanged: PropTypes.func
  }

  state = {
    name: this.props.name,
    pages: this.props.pages
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      pages: nextProps.pages
    })
  }

  getDashboard = () => ({ name: this.state.name, pages: [...this.state.pages] })

  handleNameChange = (event) => {
    this.setState({ name: event.target.value }, this.handleDashboardChanged)
  }

  handleAddPageClicked = () => {
    this.setState({
      pages: [...this.state.pages, DashboardEditor.createNewPage()]
    }, this.handleDashboardChanged)
  }

  handleRemovePageClicked = (index) => {
    const pages = [...this.state.pages]
    pages.splice(index, 1)
    this.setState({ pages }, this.handleDashboardChanged)
  }

  handleOnPageChanged = (index, page) => {
    const pages = [...this.state.pages]
    pages.splice(index, 1)
    pages.push(page)
    this.setState({ pages }, this.handleDashboardChanged)
  }

  handleDashboardChanged = () => {
    if (this.props.onDashboardChanged) {
      const dashboard = this.getDashboard()
      this.props.onDashboardChanged(dashboard)
    }
  }

  render() {
    return (
      <div style={{ marginLeft: '2rem' }}>
        <TextField
          floatingLabelText="Dashboard Name"
          hintText="Sample Dashboard"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <br />
        <ol>
          {this.state.pages.map((page, idx) =>
            <li key={idx}>
              <PageEditor
                name={page.name}
                url={page.url}
                forceProxy={page.forceProxy}
                durationMs={page.durationMs}
                ordinal={page.ordinal}
                onPageChanged={(page) => this.handleOnPageChanged(idx, page)}
              />
              {this.state.pages.length > 1 &&
                <FlatButton
                  label="Remove"
                  onClick={() => this.handleRemovePageClicked(idx)}
                />}
            </li>
          )}
        </ol>
        <FloatingActionButton
          onClick={this.handleAddPageClicked}
          mini={true}
          style={{ marginRight: 20, float: 'right' }}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default DashboardEditor