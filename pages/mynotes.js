import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../src/components/NoteFeed';
import { GET_MY_NOTES } from '../src/gql/query';
/////////////////////////////////////////////////////////

const MyNotes = () => {
    useEffect(() => {
        // Обновляем содержимое при переходе на страницу
        document.title = 'My Notes - Notedly';
    });

    const {loading, error, data} = useQuery(GET_MY_NOTES);

    if (loading) return "Загрузка...";
    if (error) return `Ошибка! ${error.message}`;
    if (data.me.notes.length !== 0)
        return <NoteFeed notes={data.me.notes} />
    else
        return <p>Добавьте пару своих заметок!</p>
}

export default MyNotes;