import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  text-align: center;
  padding: 5px;
  color: white;
`;

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