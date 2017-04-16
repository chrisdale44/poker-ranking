import React, { Component } from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';

import * as constants from '../constants/constants';
import rankHand from '../utils/rankHand';
import compareHands from '../utils/compareHands';
import PokerHand from '../components/PokerHand';
import Result from '../components/Result';

const AppContainer = styled.div`
  background-color: #222;
  padding: 20px 0;
`;

const AppHeading = styled.h1`
  color: white;
  text-align: center;
`;

const pokerHands = [
	{
		name: 'Hand 1',
		cards: [
			{value: constants.VALUES[0], suit: constants.SUITS[0]},
			{value: constants.VALUES[1], suit: constants.SUITS[0]},
			{value: constants.VALUES[2], suit: constants.SUITS[0]},
			{value: constants.VALUES[3], suit: constants.SUITS[0]},
			{value: constants.VALUES[4], suit: constants.SUITS[0]},
		]
	},
	{
		name: 'Hand 2',
		cards: [
			{value: constants.VALUES[0], suit: constants.SUITS[0]},
			{value: constants.VALUES[1], suit: constants.SUITS[0]},
			{value: constants.VALUES[2], suit: constants.SUITS[0]},
			{value: constants.VALUES[3], suit: constants.SUITS[0]},
			{value: constants.VALUES[4], suit: constants.SUITS[0]},
		]
	}
]


class App extends Component {
	constructor(props) {
		super();
		let result;

		let _state = {
			pokerHands: []
		};

		for (let i = 0; i < pokerHands.length; i++) {
			const { rank, flush, straight, pairs, threes, fours, values, suits } = rankHand(pokerHands[i].cards);
			_state.pokerHands.push({
				handId: i,
				cards: pokerHands[i].cards,
				name: pokerHands[i].name,
				rank,
				flush,
				straight,
				pairs,
				threes,
				fours,
				values,
				suits
			});
		}

		_state.result = compareHands(_state.pokerHands[0], _state.pokerHands[1]);

		this.state = _state;
	}

	handleCardChange = (e) => {
		const handId = e.target.dataset.handid,
			cardId = e.target.id,
			key = e.target.name;

		let _state = this.state,
			_hand = _state.pokerHands[handId];
		_hand.cards[cardId][key] = e.target.value;

		const { rank, flush, straight, pairs, threes, fours, values, suits } = rankHand(_hand.cards);

		_hand = Object.assign(_hand, {
			rank,
			flush,
			straight,
			pairs,
			threes,
			fours,
			values, 
			suits
		});

		_state.result = compareHands(_state.pokerHands[0], _state.pokerHands[1]);

		this.setState({
			_state
		});
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
			</AppContainer>
		);
	}
}

export default App;
