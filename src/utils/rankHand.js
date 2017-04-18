import * as _ from 'lodash';
import * as constants from '../constants/constants';

export default function rankHand(hand) {
	let { values, suits } = parseHand(hand);
	
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
					return false;
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

	// Function to take PokerHand object and return arrays of values and suits
	// as this makes life easier when ranking hands
	function parseHand(hand) {
		try {
			// Validate the input
			if (!hand) {
				throw new Error("No hand specified");
			}

			if (hand.length !== 5) {
				throw new Error("Invalid number of cards");
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
					throw new Error(`Invalid card: ${card.value}, ${card.suit}`);
				}
			});

			// Sort values numerically
			return { 
				values: sortValuesNumerically(values), 
				suits: suits 
			};
		}
		catch(err) {
			console.log(err);
		}
	}

	// Function to sort array of values in numerical order
	function sortValuesNumerically(values) {
		function sortNumber(a, b) {
			// use index of the VALUES list
			return constants.VALUES.indexOf(a) - constants.VALUES.indexOf(b);
		}

		return values.sort(sortNumber);
	}
}

	