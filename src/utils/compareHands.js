import * as _ from 'lodash';
import * as constants from '../constants';

export const validateHand = (hand) => {
	if (!hand || typeof hand.rank === 'undefined') {
		throw new Error("Hand A invalid");
	}
}

export const compareValues = (a, b, noIndex) => {
	// Unless noIndex is true, use indexes of each value
	a = (noIndex) ? a : constants.VALUES.indexOf(a);
	b = (noIndex) ? b : constants.VALUES.indexOf(b);

	// check which value is higher
	if (a > b) {
		return constants.RESULT.win;
	} else if (a < b) {
		return constants.RESULT.loss;
	} else if (a === b) {
		return constants.RESULT.tie;
	}
}

export const compareKickers = (hand_a, hand_b, result) => {
	var i = (hand_a.cards.length - 1);
	// Loop over the arrays of value starting at the top
	while (i >= 0 && result === 3) {
		// if we get one that isn't a tie then the loop stops
		result = compareValues(hand_a.cards[i].value, hand_b.cards[i].value);
		i--;
	}
	return result;
}

export const compareHands = (hand_a, hand_b) => {
	try {
		validateHand(hand_a);
		validateHand(hand_b);
	}
	catch(err) { 
		console.log(err);
	}
		
	let result = compareValues(hand_a.rank, hand_b.rank, true);

	if (result !== 3) {
		return result;
	} else {
		// check whether hands have the exactly same values
		if (_.isEmpty(_.differenceWith(hand_a.cards, hand_b.cards, _.isEqual))) {
			return constants.RESULT.tie;
		}

		// if not, then proceed to deduce the winner
		switch (hand_a.rank) {
			case 1:
				// compare pairs
				result = compareValues(hand_a.pairs[0], hand_b.pairs[0]);

				if (result !== 3) {
					return result;
				} else {
					return compareKickers(hand_a, hand_b, result);
				}
			case 2:
				// compare top pairs
				result = compareValues(hand_a.pairs[1], hand_b.pairs[1]);

				if (result !== 3) {
					return result;
				} else {
					// compare second pairs
					result = compareValues(hand_a.pairs[0], hand_b.pairs[0]);
					if (result !== 3) {
						return result;
					} else {
						return compareKickers(hand_a, hand_b, result);
					}
				}
			case 3:
				// compare three of a kinds
				result = compareValues(hand_a.threes[0], hand_b.threes[0]);

				if (result !== 3) {
					return result;
				} else {
					return compareKickers(hand_a, hand_b, result);
				}
			case 4:
				// compare top card of straights
				return compareValues(hand_a.values[4], hand_b.values[4]);
			case 5:
				// compare top card of flushes
				return compareKickers(hand_a, hand_b, result);
			case 6:
				// compare full houses
				// compare three of a kinds
				result = compareValues(hand_a.threes[0], hand_b.threes[0]);

				if (result !== 3) {
					return result;
				} else {
					// compare pairs
					result = compareValues(hand_a.pairs[0], hand_b.pairs[0]);
					if (result !== 3) {
						return result;
					} else {
						return compareKickers(hand_a, hand_b, result);
					}
				}
			case 7:
				// compare four of a kinds
				result = compareValues(hand_a.fours[0], hand_b.fours[0]);

				if (result !== 3) {
					return result;
				} else {
					return compareKickers(hand_a, hand_b, result);
				}
			case 8:
				// compare top card of straight flushes
				return compareValues(hand_a.values[4], hand_b.values[4]);
			case 9:
				// we know Royal flushes are equal
				return constants.RESULT.tie;
			case 0:
				// compare high card
				return compareKickers(hand_a, hand_b, result);
			default:
				return false;
		}
	}
}

export default compareHands;