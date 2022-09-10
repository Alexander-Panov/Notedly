import React, { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import NoteForm from "../src/components/NoteForm";
import { GET_NOTES, GET_MY_NOTES } from "../src/gql/query";
//////////////////////////////////////////////////

// Слишком много данных - эти данные нужны для быстрой прогрузки note после сохранения
const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoriteBy{
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const NewNote = props => {
    useEffect(() => {
        document.title = "Новая заметка - Notedly";
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        // Повторно получаем запрос GET_NOTES и GET_MY_NOTES, чтобы обновить кэшированный список заметок
        refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
        onCompleted: data => {
            // После завершаем перенаправляем пользователя на страницу заметки
            props.history.push(`note/${data.newNote.id}`);
        }
    })

    return (
    <React.Fragment>
        {/* Если данные загружаются, отображаем сообщение о загрузке */}
        {loading && <p>Загрузка...</p>}
        {/* Если при загрузке произошел сбой, отображаем сообщение об ошибке */}
        {error && <p>Ошибка сохранения заметки!</p>}
        <NoteForm action={data} />
    </React.Fragment>
    )
};

export default NewNote;