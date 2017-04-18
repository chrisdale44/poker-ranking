import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-block;
  padding: 5px;
`;

export const Value = styled.div`
    display: inline-block;
    padding: 1px;
    margin: 2px;
    border: 1px solid #ccc;
    width: 50px;
    border-radius: 3px;
    overflow: hidden;
    background-color: #fff;
    background: #fff;
    position: relative;
    &:after {
        top: 50%;
        left: 62%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(0, 0, 0, 0);
        border-top-color: #000000;
        border-width: 5px;
        margin-top: -2px;
        z-index: 100;
    }

    > select {
        font-size: 20px;
        padding: 20px 6px;
        width: 130%;
        border: none;
        box-shadow: none;
        background-color: transparent;
        background-image: none;
        appearance: none;
        &:focus {
            outline: none;
        }
    }
`;

export const Suit = styled(Value)`
    > select {
        font-size: 14px;
    }
`;