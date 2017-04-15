import React, { Component } from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';
import * as constants from '../constants/constants';
import Card from '../components/Card';

const PokerHand = styled.div`
  text-align: center;
`;

// class PokerHand {
// 	constructor(hand) {
// 		Object.assign( this, this.parseHand(hand) );
// 		this.rank = this.rankHand();
// 		console.log(constants.HANDRANKS[this.rank]);
// 	}
	


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

class PokerHandContainer extends Component {

// 	parseHand(hand) {
// 		try {
// 			// Validate the input
// 			if (!hand) {
// 				throw "No hand specified";
// 			}

// 			// Split cards into array
// 			var cardsArray = hand.split(" ");

// 			if (cardsArray.length !== 5) {
// 				throw "Invalid number of cards";
// 			}

// 			var values = [],
// 				suits = [];

// 			// Loop over the cards array and split value and suit into separate arrays
// 			cardsArray.forEach(function(card, i) {
// 				if (_.includes(constants.VALUESLIST, card[0]) && _.includes(constants.SUITSLIST, card[1])) {
// 					// It is not important to keep value and suit related as the only 
// 					// time suit comes into play is if all 5 cards are of one suit
// 					values.push(card[0]);
// 					suits.push(card[1]);
// 				} else {
// 					throw "Invalid card: " + card;
// 				}
// 			});

// 			// Sort values numerically
// 			return { 
// 				values: this.sortValuesNumerically(values), 
// 				suits: suits 
// 			};
// 		}
// 		catch(err) {
// 			console.log(err);
// 		}
// 	}

// 	sortValuesNumerically(values) {
// 		function sortNumber(a,b) {
// 			// use index of the VALUESLIST 
// 			return constants.VALUESLIST.indexOf(a) - constants.VALUESLIST.indexOf(b);
// 		}

// 		return values.sort(sortNumber);
// 	}

// 	rankHand() {
// 		var _this = this,
// 			matchingValues = _.countBy(this.values),
// 			straight_next_i,
// 			hand_next_i,
// 			rank;

// 		this.flush = false;
// 		this.straight = false;
// 		this.pairs = [];
// 		this.threes = [];
// 		this.fours = [];

// 		// if all 5 cards are of the same suit set flush flag to true
// 		this.flush = ((_.size(_.countBy(_this.suits)) === 1) ? true : false);

// 		// if we have a flush then there won't be any pairs, so skip this
// 		if (!this.flush) {
// 			// push any pairs / three of a kinds / four of a kinds
// 			// to their respective arrays
// 			_.forOwn(matchingValues, function(v, k) {
// 				switch(v) {
// 					case 2:
// 						// pair
// 						_this.pairs.push(k);
// 						break;
// 					case 3:
// 						// three of a kind
// 						_this.threes.push(k);
// 						break;
// 					case 4:
// 						// four of a kind
// 						_this.fours.push(k);
// 						break;
// 					default:
// 						// do nothing
// 						break;
// 				}
// 			});
// 		}

// 		// if any pairs were found then we already know we don't have a straight, so skip this
// 		if (!this.pairs.length || !this.threes.length || !this.fours.length) {
// 			// set flag to true, until we prove otherwise
// 			this.straight = true;

// 			// Loop over the hand and check the sequence of values for a valid straight
// 			this.values.forEach(function(value, i) {
// 				// don't perform this validation on the last card in the hand
// 				if (i >= (_this.values.length-1)) {
// 					return false;
// 				}
// 				// Get the index of the next value of the straight
// 				straight_next_i =  constants.VALUESLIST.indexOf(value) + 1;
// 				// and the index of the next value in the hand
// 				hand_next_i = constants.VALUESLIST.indexOf(_this.values[i+1]);

// 				// if the next value of the straight is not equal to the next value in our hand
// 				// then it is not a straight
// 				if (hand_next_i !== straight_next_i) {
// 					// straights going 2 3 4 5 should also allow Aces to make a straight
// 					if (i === 3 && straight_next_i === 4 && hand_next_i === (constants.VALUESLIST.length - 1)) {
// 						return false;
// 					}
// 					_this.straight = false;
// 					return false;
// 				}
// 			});
// 		}

// 		if (this.straight) {
// 			// if we have a 5 high straight (2 3 4 5 A), we need to re-order it
// 			if (this.values[0] === "2" && this.values[4] === "A") {
// 				// Push the ace to the beginning of the straight
// 				this.values.unshift(this.values.pop());
// 			}
// 		}

// 		// determine the hand
// 		if (this.pairs.length === 1 && !this.threes.length) {
// 			// pair
// 			rank = 1;
// 		} else if (this.pairs.length === 2) {
// 			// two pair
// 			rank = 2;
// 		} else if (this.threes.length && !this.pairs.length) {
// 			// three of a kind
// 			rank = 3;
// 		}  else if (this.straight && !this.flush) {
// 			// straight
// 			rank = 4;
// 		} else if (this.flush && !this.straight) {
// 			// flush
// 			rank = 5;
// 		} else if (this.pairs.length && this.threes.length) {
// 			// full house
// 			rank = 6;
// 		} else if (this.fours.length) {
// 			// four of a kind
// 			rank = 7;
// 		} else if (this.flush && this.straight) {
// 			// straight flush
// 			rank = 8;
// 			if (this.values[3] === constants.VALUESLIST[constants.VALUESLIST.length-2]) {
// 				// royal flush
// 				rank = 9;
// 			}
// 		} else {
// 			// high card
// 			rank = 0;
// 		}
// 		return rank;
// 	}

    constructor(props) {
        super();
        this.state = {
            cards: [
                // [value, suit]
                {value: constants.VALUES[0], suit: constants.SUITS[0]},
                {value: constants.VALUES[1], suit: constants.SUITS[0]},
                {value: constants.VALUES[2], suit: constants.SUITS[0]},
                {value: constants.VALUES[3], suit: constants.SUITS[0]},
                {value: constants.VALUES[4], suit: constants.SUITS[0]},
            ]
        };
    }

    handleCardChange = (e) => {
        let cardId = e.target.id,
            key = e.target.name;

        const cards = this.state.cards;
        cards[cardId][key] = e.target.value;

        this.setState({
            cards,
        });
    }

    render() {
        return (
            <PokerHand>
                {this.state.cards.map( (card, i) => <Card key={i} id={i} value={card.value} suit={card.suit} onChange={this.handleCardChange} />) }
            </PokerHand>
        );
    }
}

export default PokerHandContainer; 
