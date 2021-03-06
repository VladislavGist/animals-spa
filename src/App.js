import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import { actions as actionsSnackbar } from '../src/ducks/snackbarReducer'
import { actions as actionsFilterCity } from '../src/ducks/filterCity'
import { actions as actionsAuth } from '../src/ducks/auth'
import { actions as actionsMenu } from '../src/ducks/menuReducer'

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
import Pagination from './components/pagination/Pagination'

class App extends Component {

	componentWillMount() {
		const {
			fetchCitysList,
			getUserData,
			getCategories,
			cityTopHeader,
			getTypesList
		} = this.props

		const storageToken = localStorage.getItem('token')

		if (storageToken) getUserData(storageToken)
		fetchCitysList()
		getCategories(cityTopHeader)
		getTypesList()
	}

	componentWillReceiveProps(next) {
		const {
			cityTopHeader,
			getCategories
		} = this.props

		const {
			cityTopHeader: nextFilterCity
		} = next

		if (nextFilterCity !== cityTopHeader) {
			getCategories(nextFilterCity)
		}
	}

	render() {
		const {
			location,
			params,
			preloaderLoading,
			children
		} = this.props

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
								<Menu params={ params } />
								<div className={ classes }>
									{ children }

									{ ['/'].includes(location) || location.search(/animals/i) > 0 ? (
										<Pagination />
									) : null }
									
								</div>
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
	const { preloader, auth, filterCity } = state
	const { location, params } = ownProps

	return {
		preloaderLoading: preloader.loading,
		location: location.pathname,
		params,
		authError: auth.userError && auth.userError.code,
		cityTopHeader: filterCity.cityTopHeader
	}
}

export default connect(
	mapStateToProps,
	{
		...actionsSnackbar,
		...actionsFilterCity,
		...actionsAuth,
		...actionsMenu
	}
)(App)