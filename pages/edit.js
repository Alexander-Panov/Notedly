// Динамическая маршрутизация - GraphQL запрос отдельных заметок (/edit/<note_id>)
import React from "react";

import { useQuery, useMutation, gql } from '@apollo/client';

import { GET_ME, GET_NOTE } from "../src/gql/query";
import { EDIT_NOTE } from "../src/gql/mutation";

import NoteForm from "../src/components/NoteForm";

const EditNote = props => {//props.match - (из React Router) включает в себя инфу о том, как путь маршрута сопоставляется с URL
    // Сохраним полученное id в отдельную переменную
    const id = props.match.params.id;

    const { loading, error, data } = useQuery(GET_NOTE, {variables: { id } });
    // Получаем информацию о текущем пользователе
    const { data: userdata, loading: userloading, error: usererror } = useQuery(GET_ME);

    const [editNote] = useMutation(EDIT_NOTE, {
        variables: { id },
        onCompleted: () => {
            props.history.push(`/note/${id}`)
        }
    });

    if (loading || userloading) return <p>Загрузка...</p>
    if (error || usererror) return <p>Ошибка: Заметка не найдена</p>

    // Если пользователь не является автором заметки - редактировать ему запрещено
    if (userdata.me.id !== data.note.author.id)
        return <p>Вы не имеет доступа к редактированию этой заметки</p>

    // Передаем данные в компонент формы
    return <NoteForm content={data.note.content} action={editNote}/>
};

export default EditNote;

// ! Добавить автоматическую переадресацию неавторизованных пользователей