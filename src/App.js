import React, { Component } from 'react';
import styled from 'styled-components';
import PokerHandContainer from './containers/PokerHand';

import './App.css';

const AppContainer = styled.div`
  background-color: #222;
  padding: 20px 0;
`


class App extends Component {
  handleHandComparison = () => {

  }

  render() {
    return (
      <AppContainer>
        <PokerHandContainer />
        <PokerHandContainer />
      </AppContainer>
    );
  }
}

export default App;
