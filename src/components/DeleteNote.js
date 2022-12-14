import React from "react";
import { useMutation } from "@apollo/client";
import { withRouter } from "react-router-dom";

import ButtonAsLink from "./ButtonAsLink";
// Импортируем мутацию DELETE_NOTE
import { DELETE_NOTE } from "../gql/mutation";
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";


const DeleteNote = props => {
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        // Повторно получаем список всех заметок, чтобы обновить кэш
        refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
        onCompleted: data => {
            // Перенаправляем пользователя на страницу "my notes"
            props.history.push('/mynotes');
        }
    });
    return <ButtonAsLink onClick={deleteNote}>Удалить заметку</ButtonAsLink>
}

export default withRouter(DeleteNote);