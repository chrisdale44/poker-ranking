import styled from 'styled-components';

export const Label = styled.div`
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