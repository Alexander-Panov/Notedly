import React, { useEffect } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client'

import UserForm from '../src/components/UserForm';

///////////////////////////////////////////////////////////
const SIGNIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;
///////////////////////////////////////////////////////////

const SignIn = props => {
    useEffect(() => {
        document.title = 'Вход - Notedly';
    });

    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // Сохраняем токен
            localStorage.setItem('token', data.signIn);
            // Обновляем локальный кэш
            client.writeData({ data: { isLoggedIn: true } });
            // Перенаправляем пользователя на домашнюю страницу
            props.history.push('/');
        }
    })

    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
            {/* Если данные загружаются, отображаем сообщение о загрузке */}
            {loading && <p>Загрузка...</p>}
            {/* Если при загрузке произошел сбой, отображаем сообщение об ошибке */}
            {error && <p>Ошибка в создании аккаунта!</p>}
        </React.Fragment>
    );
};

export default SignIn;