// Динамическая маршрутизация - GraphQL запрос отдельных заметок (/note/<note_id>)
import React from "react";

import { useQuery, gql } from '@apollo/client';

import Note from "../src/components/Note";

import { GET_NOTE } from "../src/gql/query";

const NotePage = props => {//props.match - (из React Router) включает в себя инфу о том, как путь маршрута сопоставляется с URL
    // Сохраним полученное id в отдельную переменную
    const id = props.match.params.id;

    const { loading, error, data } = useQuery(GET_NOTE, {variables: { id } });

    if (loading) return <p>Загрузка...</p>
    if (error) return <p>Ошибка: При получении данных произошел сбой</p>
    
    return <Note note={data.note} />;

    // return (
    //     <div>
    //         <p>ID: {props.match.params.id} </p>
    //     </div>
    // );
};

export default NotePage;