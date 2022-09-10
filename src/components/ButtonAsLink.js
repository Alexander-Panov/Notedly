import styled from 'styled-components';

const ButtonAsLink = styled.button`
    background: none;
    color: #07c;
    border: none;
    padding: 0;
    font: inherit;
    text-decoration: underline;
    cursor: pointer;

    :hover,
    :active {
        color: #049;
    }
`;

export default ButtonAsLink;