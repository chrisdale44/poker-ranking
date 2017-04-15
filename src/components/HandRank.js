import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as constants from '../constants/constants';

const Rank = styled.div`
  display: inline-block;
  color: white
`;

export default function HandRank(props) {
    return (
        <Rank>{constants.HAND_RANKS[props.rank]}</Rank>
    );
}

HandRank.propTypes = {
    rank: PropTypes.number
};