import React from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../constants';
import { Rank } from './styles';

export const HandRank = (props) => {
    return (
        <Rank><span>{constants.HAND_RANKS[props.rank]}</span></Rank>
    );
}

HandRank.propTypes = {
    rank: PropTypes.number
};

export default HandRank;