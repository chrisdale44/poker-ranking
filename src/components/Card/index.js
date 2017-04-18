import React from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../constants/constants';

import { Wrapper, Value, Suit } from './style';

export default function Card(props) {
    const { value, suit } = props.card;

    return (
        <Wrapper>
            <Value>
                <select onChange={props.onChange} data-handid={props.handId} value={value} id={props.cardId} name='value'>
                    {constants.VALUES.map((value, i) => <option key={i} value={value}>{value}</option>)}
                </select>
            </Value>
            <Suit>
                <select onChange={props.onChange} data-handid={props.handId} value={suit} id={props.cardId} name='suit'>
                    {constants.SUITS.map((suit, i) => <option key={i} value={suit}>{constants.SUIT_ICONS[suit]}</option>)}
                </select>
            </Suit>
        </Wrapper>
    );
}

Card.propTypes = {
    cardId: PropTypes.number.isRequired,
    handId: PropTypes.number.isRequired,
    card: PropTypes.shape({
        value: PropTypes.oneOf(constants.VALUES),
        suit: PropTypes.oneOf(constants.SUITS),
    }).isRequired,
    onChange: PropTypes.func.isRequired,
}