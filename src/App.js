import React, { Component } from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';

import * as constants from './constants/constants';
import PokerHand from './components/PokerHand';
import './App.css';

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

		this.state = {
			pokerHands: []
		};

		for (let i = 0; i < pokerHands.length; i++) {
			const { rank, flush, straight, pairs, threes, fours } = this.rankHand(pokerHands[i].cards);
			this.state.pokerHands.push({
				handId: i,
				cards: pokerHands[i].cards,
				rank: rank,
				flush: flush,
				straight: straight,
				pairs: pairs,
				threes: threes,
				fours: fours
			});
		}
	}

	handleCardChange = (e) => {
		const handId = e.target.dataset.handid,
			cardId = e.target.id,
			key = e.target.name;

		let _state = this.state,
			_hand = _state.pokerHands[handId];
		_hand.cards[cardId][key] = e.target.value;

		const { rank, flush, straight, pairs, threes, fours } = this.rankHand(_hand.cards);

		_hand = Object.assign(_hand, {
			rank: rank,
			flush: flush,
			straight: straight,
			pairs: pairs,
			threes: threes,
			fours: fours
		});

		this.setState({
			_state
		});
  }

  rankHand(hand) {
        let { values, suits } = this.parseHand(hand);
		
        var matchingValues = _.countBy(values),
			straight_next_i,
			hand_next_i,
			rank;

		let flush = false,
            straight = false,
            pairs = [],
            threes = [],
            fours = [];

		// if all 5 cards are of the same suit set flush flag to true
		flush = ((_.size(_.countBy(suits)) === 1) ? true : false);

		// if we have a flush then there won't be any pairs, so skip this
		if (!flush) {
			// push any pairs / three of a kinds / four of a kinds
			// to their respective arrays
			_.forOwn(matchingValues, function(v, k) {
				switch(v) {
					case 2:
						// pair
						pairs.push(k);
						break;
					case 3:
						// three of a kind
						threes.push(k);
						break;
					case 4:
						// four of a kind
						fours.push(k);
						break;
					default:
						// do nothing
						break;
				}
			});
		}

		// if any pairs were found then we already know we don't have a straight, so skip this
		if (!pairs.length || !threes.length || !fours.length) {
			// set flag to true, until we prove otherwise
			straight = true;

			// Loop over the hand and check the sequence of values for a valid straight
			values.forEach(function(value, i) {
				// don't perform this validation on the last card in the hand
				if (i >= (values.length-1)) {
					return false;
				}
				// Get the index of the next value of the straight
				straight_next_i =  constants.VALUES.indexOf(value) + 1;
				// and the index of the next value in the hand
				hand_next_i = constants.VALUES.indexOf(values[i+1]);

				// if the next value of the straight is not equal to the next value in our hand
				// then it is not a straight
				if (hand_next_i !== straight_next_i) {
					// straights going 2 3 4 5 should also allow Aces to make a straight
					if (i === 3 && straight_next_i === 4 && hand_next_i === (constants.VALUES.length - 1)) {
						return false;
					}
					straight = false;
					return false;
				}
			});
		}

		if (straight) {
			// if we have a 5 high straight (2 3 4 5 A), we need to re-order it
			if (values[0] === "2" && values[4] === "A") {
				// Push the ace to the beginning of the straight
				values.unshift(values.pop());
			}
		}

		// determine the hand
		if (pairs.length === 1 && !threes.length) {
			// pair
			rank = 1;
		} else if (pairs.length === 2) {
			// two pair
			rank = 2;
		} else if (threes.length && !pairs.length) {
			// three of a kind
			rank = 3;
		}  else if (straight && !flush) {
			// straight
			rank = 4;
		} else if (flush && !straight) {
			// flush
			rank = 5;
		} else if (pairs.length && threes.length) {
			// full house
			rank = 6;
		} else if (fours.length) {
			// four of a kind
			rank = 7;
		} else if (flush && straight) {
			// straight flush
			rank = 8;
			if (values[3] === constants.VALUES[constants.VALUES.length-2]) {
				// royal flush
				rank = 9;
			}
		} else {
			// high card
			rank = 0;
		}
		return {
            rank: rank,
            flush: flush,
            straight: straight,
            pairs: pairs,
            threes: threes,
            fours: fours
        };
	}

    // Function to take PokerHand object and return arrays of values and suits
    // as this makes life easier when ranking hands
	parseHand(hand) {
		try {
			// Validate the input
			if (!hand) {
				throw "No hand specified";
			}

			if (hand.length !== 5) {
				throw "Invalid number of cards";
			}

			var values = [],
				suits = [];

			// Loop over the cards array and split value and suit into separate arrays
			hand.forEach(function(card, i) {
                
				if (_.includes(constants.VALUES, card.value) && _.includes(constants.SUITS, card.suit)) {
					// It is not important to keep value and suit related as the only 
					// time suit comes into play is if all 5 cards are of one suit
					values.push(card.value);
					suits.push(card.suit);
				} else {
					throw `Invalid card: ${card.value}, ${card.suit}`;
				}
			});

			// Sort values numerically
			return { 
				values: this.sortValuesNumerically(values), 
				suits: suits 
			};
		}
		catch(err) {
			console.log(err);
		}
	}

    // Function to sort array of values in numerical order
	sortValuesNumerically(values) {
		function sortNumber(a,b) {
			// use index of the VALUES list
			return constants.VALUES.indexOf(a) - constants.VALUES.indexOf(b);
		}

		return values.sort(sortNumber);
	}

    // 	compareWith(competitor) {
// 		try {
// 			if (!this || typeof this.rank === 'undefined') {
// 				throw "Hand invalid";
// 			}
// 			if (!competitor || !competitor.rank) {
// 				throw "Competitor hand invalid";
// 			}
// 		}
// 		catch(err) { 
// 			console.log(err);
// 		}
			
// 		var result = compareValues(this.rank, competitor.rank, true);

// 		if (result !== 3) {
// 			return result;
// 		} else {
// 			// check whether hands have the exactly same values
// 			if (_.isEmpty(_.xor(this.values, competitor.values))) {
// 				return constants.RESULT.tie;
// 			}

// 			// if not, then proceed to deduce the winner
// 			switch (this.rank) {
// 				case 1:
// 					// compare pairs
// 					result = compareValues(this.pairs[0], competitor.pairs[0]);

// 					if (result !== 3) {
// 						return result;
// 					} else {
// 						// compare kickers
// 						return compareKickers(this);
// 					}
// 					break;
// 				case 2:
// 					// compare top pairs
// 					result = compareValues(this.pairs[1], competitor.pairs[1]);

// 					if (result !== 3) {
// 						return result;
// 					} else {
// 						// compare second pairs
// 						result = compareValues(this.pairs[0], competitor.pairs[0]);
// 						if (result !== 3) {
// 							return result;
// 						} else {
// 							// compare kickers
// 							return compareKickers(this);
// 						}
// 					}
// 					break;
// 				case 3:
// 					// compare three of a kinds
// 					result = compareValues(this.threes[0], competitor.threes[0]);

// 					if (result !== 3) {
// 						return result;
// 					} else {
// 						// compare kickers
// 						return compareKickers(this);
// 					}
// 					break;
// 				case 4:
// 					// compare top card of straights
// 					return compareValues(this.values[4], competitor.values[4]);
// 					break;
// 				case 5:
// 					// compare top card of flushes
// 					return compareKickers(this);
// 					break;
// 				case 6:
// 					// compare full houses
// 					// compare three of a kinds
// 					result = compareValues(this.threes[0], competitor.threes[0]);

// 					if (result !== 3) {
// 						return result;
// 					} else {
// 						// compare second pairs
// 						result = compareValues(this.pairs[0], competitor.pairs[0]);
// 						if (result !== 3) {
// 							return result;
// 						} else {
// 							// compare kickers
// 							return compareKickers(this);
// 						}
// 					}
// 					result = compareValues(this.pairs[1], competitor.pairs[1]);

// 					if (result !== 3) {
// 						return result;
// 					} else {
// 						// compare second pairs
// 						result = compareValues(this.pairs[0], competitor.pairs[0]);
// 						if (result !== 3) {
// 							return result;
// 						} else {
// 							// compare kickers
// 							return compareKickers(this);
// 						}
// 					}

// 					break;
// 				case 7:
// 					// compare four of a kinds
// 					result = compareValues(this.fours[0], competitor.fours[0]);

// 					if (result !== 3) {
// 						return result;
// 					} else {
// 						// compare kickers
// 						return compareKickers(this);
// 					}
// 					break;
// 				case 8:
// 					// compare top card of straight flushes
// 					return compareValues(this.values[4], competitor.values[4]);
// 					break;
// 				case 9:
// 					// we know Royal flushes are equal
// 					return constants.RESULT.tie;
// 					break;
// 				case 0:
// 					// compare high card
// 					return compareKickers(this);
// 					break;

// 			}
// 			return constants.RESULT.tie;
// 		}

// 		function compareValues(a, b, noIndex) {
// 			// Unless noIndex is true, use indexes of each value
// 			a = (noIndex) ? a : constants.VALUESLIST.indexOf(a);
// 			b = (noIndex) ? b : constants.VALUESLIST.indexOf(b);

// 			// check which value is higher
// 			if (a > b) {
// 				// win
// 				return constants.RESULT.win;
// 			} else if (a < b) {
// 				// loss
// 				return constants.RESULT.loss;
// 			} else if (a === b) {
// 				// tie 
// 				return constants.RESULT.tie;
// 			}
// 		}

// 		function compareKickers(_this) {
// 			var i = (_this.values.length - 1);
// 			// Loop over the arrays of value starting at the top
// 			while (i >= 0 && result === 3) {
// 				// if we get one that isn't a tie then the loop stops
// 				result = compareValues(_this.values[i], competitor.values[i]);
// 				i--;
// 			}
// 			return result;
// 		}
// 	};
// };

  render() {
	return (
		<AppContainer>
			<AppHeading>Poker Hand Comparison</AppHeading>
			
			{ this.state.pokerHands.map((pokerHand, i) => <PokerHand key={i} data={pokerHand} onChange={this.handleCardChange} /> ) }
			
			{/*<ComparisonResult />*/}
		</AppContainer>
	);
  }
}

export default App;
