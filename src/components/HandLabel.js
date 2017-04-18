import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.div`
    flex-grow: 1;
    position: relative;
    display: inline-block;
    text-align: right;
    margin-right: 10px;

    > span {
        position: absolute;
        color: white;
        text-transform: capitalize;
        right: 0;
        top: -9px;
    }

`;

export default function HandLabel(props) {
    return (
        <Label><span>{props.name}</span></Label>
    );
}

HandLabel.propTypes = {
    name: PropTypes.string.isRequired
};