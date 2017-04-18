import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as constants from '../constants/constants';

const Rank = styled.div`
    flex-grow: 1;
    position: relative;
    margin-left: 10px;
    text-align: left;
    
    > span {
        position: absolute;
        left: 0;
        color: white;
        text-transform: capitalize;
        top: -9px;
    }
`;

export default function HandRank(props) {
    return (
        <Rank><span>{constants.HAND_RANKS[props.rank]}</span></Rank>
    );
}

HandRank.propTypes = {
    rank: PropTypes.number
};