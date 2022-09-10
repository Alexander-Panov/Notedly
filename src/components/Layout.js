/* Общий компонент макета */
import React from "react";
import styled from "styled-components";

import Header from "./header";
import Navigation from "./navigation";

// Стили компонента
const Wrapper = styled.div`
    /* Можно применить в стилизованном компоненте медиазапросы */
    @media (min-width: 700px) { /* Это будет применятся для экранов 700px и больше */
        display: flex;
        top: 64px;
        position: relative;
        height: calc(100% - 64px);
        width: 100%;
        flex: auto;
        flex-direction: column;
    }
`;

const Main = styled.main`
    position: fixed;
    height: calc(100% - 185px);
    width: 100%;
    padding: 1em;
    overflow-y: scroll;
    /* Снова применяем стили медиазапросов к экранам от 700 пикселей */
    @media (min-width: 700px) {
        flex: 1;
        margin-left: 220px;
        height: calc(100% - 64px);
        width: calc(100% - 220px);
    }
`;

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <Wrapper>
                <Navigation />
                <Main>{children}</Main>
            </Wrapper>
        </React.Fragment>
    );
};

export default Layout;