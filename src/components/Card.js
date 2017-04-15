import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as constants from '../constants/constants';

const Wrapper = styled.div`
  display: inline-block;
  padding: 5px;
`;

const Value = styled.div`
    display: inline-block;
    padding: 1px;
    margin: 2px;
    border: 1px solid #ccc;
    width: 50px;
    border-radius: 3px;
    overflow: hidden;
    background-color: #fff;
    background: #fff;
    position: relative;
    &:after {
        top: 50%;
        left: 62%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(0, 0, 0, 0);
        border-top-color: #000000;
        border-width: 5px;
        margin-top: -2px;
        z-index: 100;
    }

    > select {
        font-size: 18px;
        padding: 5px 8px;
        width: 130%;
        border: none;
        box-shadow: none;
        background-color: transparent;
        background-image: none;
        -webkit-appearance: none;
        -moz-appearance: none;
                appearance: none;
        &:focus {
            outline: none;
        }
    }
`;

const Suit = styled(Value)`

`;

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