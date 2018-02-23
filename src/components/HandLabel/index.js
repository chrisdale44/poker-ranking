import React from 'react';
import PropTypes from 'prop-types';
import { Label } from './styles';

export default function HandLabel(props) {
    return (
        <Label><span>{props.name}</span></Label>
    );
}

HandLabel.propTypes = {
    name: PropTypes.string.isRequired
};