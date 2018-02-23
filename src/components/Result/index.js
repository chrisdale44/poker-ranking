import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './styles';

export default function Card(props) {
    return (
        <Wrapper>
            <h2>{props.result}</h2>
        </Wrapper>
    );
}

Card.propTypes = {
    result: PropTypes.string.isRequired,
}