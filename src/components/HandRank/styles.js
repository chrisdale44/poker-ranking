import styled from 'styled-components';

export const Rank = styled.div`
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