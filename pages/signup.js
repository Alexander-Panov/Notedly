import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Button from "../src/components/Button";

import { useMutation, useApolloClient, gql } from "@apollo/client";
import UserForm from "../src/components/UserForm";

///////////////////////////////////////////////////////////
const SIGNUP_USER = gql`
    mutation signup($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;
///////////////////////////////////////////////////////////

const SignUp = props => {

    useEffect(() => {
        document.title = 'Войти - Notedly';
    });

    const client = useApolloClient();
    // Добавляем хук мутации
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // local storage - простое хранилище пар "значение" - "ключ", хранящееся на протяжении ряда сессий браузера
            // пока будет не обновлено или очищено
            localStorage.setItem('token', data.signUp);
            // Обновляем локальный кэш
            client.writeData({ data: { isLoggedIn: true } });
            // Перенаправляем пользователя на другую страницу
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {/* Если данные загружаются, отображаем сообщение о загрузке */}
            {loading && <p>Загрузка...</p>}
            {/* Если при загрузке произошел сбой, отображаем сообщение об ошибке */}
            {error && <p>Ошибка в создании аккаунта!</p>}
        </React.Fragment>
    );
};

export default SignUp;