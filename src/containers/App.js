import React, { Component } from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';

import * as constants from '../constants/constants';
import generateHand from '../utils/generateHand';
import rankHand from '../utils/rankHand';
import compareHands from '../utils/compareHands';
import PokerHand from '../components/PokerHand';
import Result from '../components/Result';

const AppContainer = styled.div`
  background-color: darkgreen;
  padding: 20px 0;
`;

const AppHeading = styled.h1`
  color: white;
  text-align: center;
`;


class App extends Component {
	constructor(props) {
		super();
		this.state = this.newPokerHands();
		
	}

	handleRefresh = (e) => {
		this.setState(
			this.newPokerHands()
		);
	}

	newPokerHands() {
		let pokerHands = generateHand(constants.NO_OF_HANDS);

		let _state = {
			pokerHands: []
		};

		// Loop over hands
		for (let i = 0; i < pokerHands.length; i++) {
			// Rank each hand
			const { rank, flush, straight, pairs, threes, fours } = rankHand(pokerHands[i].cards);

			// Create state object for each hand
			_state.pokerHands.push({
				handId: i,
				cards: pokerHands[i].cards,
				name: pokerHands[i].name,
				rank,
				flush,
				straight,
				pairs,
				threes,
				fours
			});
		}

		// Get result of comparison
		_state.result = compareHands(_state.pokerHands[0], _state.pokerHands[1]);

		// return state object
		return _state;
	}

	updatePokerHandValue(handId, cardId, key, newValue) {
		let _state = this.state,
			_hand = _state.pokerHands[handId];
		_hand.cards[cardId][key] = newValue;

		const { rank, flush, straight, pairs, threes, fours } = rankHand(_hand.cards);

		_hand = Object.assign(_hand, {
			rank,
			flush,
			straight,
			pairs,
			threes,
			fours
		});

		_state.result = compareHands(_state.pokerHands[0], _state.pokerHands[1]);

		return _state;
	}

	handleCardChange = (e) => {
		this.setState(
			this.updatePokerHandValue(e.target.dataset.handid, e.target.id, e.target.name, e.target.value)
		);
  	}

	getResultText = (result) => {
		switch (result) {
			case 1:
				return `${this.state.pokerHands[0].name} wins`;
			case 2:
				return `${this.state.pokerHands[1].name} wins`;
			case 3:
				return `Tie`;
			default:
      			throw new Error('Unknown result: ' + result)
		}
	};

	render() {
		return (
			<AppContainer>
				<AppHeading>Poker Hand Comparison</AppHeading>
				
				{ this.state.pokerHands.map((pokerHand, i) => <PokerHand key={i} data={pokerHand} onChange={this.handleCardChange} /> ) }
				
				<Result result={this.getResultText(this.state.result)} />

				<button onClick={this.handleRefresh}>Refresh</button>
			</AppContainer>
		);
	}
}

export default App;
