import React from 'react';
import PropTypes from 'prop-types';
import { Label } from './styles';

export const HandLabel = (props) => {
    return (
        <Label><span>{props.name}</span></Label>
    );
}

HandLabel.propTypes = {
    name: PropTypes.string.isRequired
};

export default HandLabel;