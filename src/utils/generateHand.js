import * as _ from 'lodash';
import * as constants from '../constants';
import randomNumberGenerator from './randomNumberGenerator';

export const generateCard = () => {
    return {
        value: constants.VALUES[randomNumberGenerator(0, constants.VALUES.length-1)],
        suit: constants.SUITS[randomNumberGenerator(0, constants.SUITS.length-1)]
    }
}

export const generateHand = (n) => {
    let pokerHands = [],
        cards;

    for (var i = 0; i < n; i++) {
        cards = [];

        for (var j = 0; j < constants.CARDS_PER_HAND; j++) {
            cards.push(generateCard());
        }

        pokerHands.push({
            name: `Hand ${i+1}`,
            cards: cards
        });
    }

    return pokerHands;
}

export default generateHand;

