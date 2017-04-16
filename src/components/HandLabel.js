import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.div`
  display: inline-block;
  color: white
`;

export default function HandLabel(props) {
    return (
        <Label>{props.name}</Label>
    );
}

HandLabel.propTypes = {
    name: PropTypes.string.isRequired
};