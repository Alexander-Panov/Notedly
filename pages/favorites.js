import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_MY_FAVORITES } from '../src/gql/query';
import NoteFeed from '../src/components/NoteFeed';


const Favorites = () => {
    useEffect(() => {
        // Обновляем содержимое при переходе на страницу
        document.title = 'Favorites - Notedly'
    });

    const {loading, error, data} = useQuery(GET_MY_FAVORITES);

    if (loading) return "Загрузка...";
    if (error) return `Ошибка! ${error.message}`;
    if (data.me.favorites.length !== 0)
        return <NoteFeed notes={data.me.favorites} />
    else
        return <p>Пора бы сохранить пару заметок!</p>
}

export default Favorites;