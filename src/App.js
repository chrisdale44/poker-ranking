import React, { Component } from 'react';
import styled from 'styled-components';
import PokerHand from './containers/PokerHand';
import * as constants from './constants/constants';
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
  render() {
    return (
      <AppContainer>
        <AppHeading>Poker Hand Comparison</AppHeading>
        {pokerHands.map((pokerHand, i) => <PokerHand key={i} name={pokerHand.name} cards={pokerHand.cards} /> )}
        {/*<ComparisonResult />*/}
      </AppContainer>
    );
  }
}

export default App;
