import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import { actions as actionsSnackbar } from '../src/ducks/snackbarReducer'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
injectTapEventPlugin()

if (process.env.BROWSER) {
	require('./styles/styles.sass')
	require('./styles/base.sass')
	require('./App.sass')
}

import Sidebar from './components/sidebar/Sidebar.js'
import Menu from './components/menu/MenuComponent.js'
import Footer from './components/footer/FooterComponent.js'
import LinearProgressExampleDeterminate from './components/progressBar/ProgressBarComponent.js'
import SnackbarExampleSimple from './components/snackbarExampleSimple/SnackbarExampleSimpleComponent.js'

class App extends Component {

	render() {
		const { location, preloaderLoading, children } = this.props

		const classes = classNames({
			spaContent: true,
			modileModificator: location === '/personalArea'
		})

		return (
			<MuiThemeProvider>
				<div className='wrapApp'>

					{ (preloaderLoading > 0
						&& preloaderLoading !== 100)
						&& <LinearProgressExampleDeterminate className='progressBar' /> }

					<div className='container'>
						<Sidebar />
						<div className='wrapBackground'>
							<div className='wrapper'>
								<Menu />
								<div className={ classes }>{ children }</div>
							</div>
							<Footer />
						</div>
					</div>
					<SnackbarExampleSimple />
				</div>
			</MuiThemeProvider>
		)
	}
}

App.propTypes = {
	location: PropTypes.string,
	preloaderLoading: PropTypes.number,
	authError: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
	const { preloader, auth } = state
	const { location } = ownProps

	return {
		preloaderLoading: preloader.loading,
		location: location.pathname,
		authError: auth.userError && auth.userError.code
	}
}

export default connect(mapStateToProps, { ...actionsSnackbar })(App)