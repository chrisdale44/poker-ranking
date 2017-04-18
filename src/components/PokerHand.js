import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HandLabel from '../components/HandLabel';
import Card from '../components/Card';
import HandRank from '../components/HandRank';

const PokerHandContainer = styled.div`
    display: flex;
    align-items: center;
`;

export default function PokerHand(props) {
    const { handId, name, cards, rank } = props.data;

    return (
        <PokerHandContainer>
            <HandLabel name={name} />

            { cards.map( (card, i) => <Card key={i} handId={handId} cardId={i} card={card} onChange={props.onChange} />) }
            
            <HandRank rank={rank} />
        </PokerHandContainer>
    );
}

PokerHand.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};
