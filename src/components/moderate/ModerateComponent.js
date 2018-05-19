import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import Card from '../cards/card/Card'
import { actions as actionsArticles } from '../../ducks/articles'
import { actions as actionsAllParamsUrl } from '../../ducks/allParamsUrl'

class Moderate extends Component {

	hancleDeleteCards = () => {
		const { removeCardsInDb } = this.props
		removeCardsInDb()
	}

	componentWillMount() {
		const { getCards } = this.props
		getCards({ moderate: false })
	}

	componentWillUnmount() {
		this.props.onHandleClearState()
	}

	render() {
		const { articlesList } = this.props

		return (
			<div>
				<a href='javascript:void(0)' onClick={ this.hancleDeleteCards }>Удалить объявления с прошедшей датой</a>
				<br />
				<br />
				{
					articlesList.length ? articlesList.map(card => <Card
						addDate={ card.addDate }
						userId={ card.userId }
						cardId={ card.key }
						key={ card.key }
						title={ card.title }
						briefDescription={ card.textArea }
						city={ card.city }
						userName={ card.userName }
						phoneNumber={ card.phoneNumber }
						price={ card.price }
						imgPath={ card.images }
						advType={ card.advType }
						views={ null }
						rating={ null }
						userStatus={ null }
						moderate={ true }
					/>) : <p>Объявлений на модерацию нет</p>
				}
			</div>
		)
	}
}

Moderate.propTypes = {
	removeCardsInDb: PropTypes.func.isRequired,
	articlesList: PropTypes.object
}

export default connect(
	state => ({ articlesList: state.articles.articlesList }),
	{ ...actionsArticles, ...actionsAllParamsUrl }
)(Moderate)