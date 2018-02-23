import React from 'react';
import PropTypes from 'prop-types';
import HandLabel from '../HandLabel';
import Card from '../Card';
import HandRank from '../HandRank';
import { Container } from './styles';

export const PokerHand = (props) => {
    const { handId, name, cards, rank } = props.data;

    return (
        <Container>
            <HandLabel name={name} />

            { cards.map( (card, i) => <Card key={i} handId={handId} cardId={i} card={card} onChange={props.onChange} />) }
            
            <HandRank rank={rank} />
        </Container>
    );
}

PokerHand.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default PokerHand;
