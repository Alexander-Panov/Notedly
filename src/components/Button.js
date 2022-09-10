import styled from 'styled-components';

const Button = styled.button`
    /* Здесь будут наши стили */
    display: block;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
    background-color: #0077cc;
    cursor: pointer;

    :hover {
    opacity: 0.8;
    }

    :active {
    background-color: #005fa3;
    }
`;

export default Button;

// 1. Можем легко определять область видимости стилей
// 2. Стилизованный компонент можно использовать в любой части приложения
// 3. Мы можем легко находить и изменять стили в базе кода