/* Разметка отдельной заметки */
import React from "react";
import ReactMarkdown from "react-markdown";

// Изменение представления даты createdAt
import { format } from 'date-fns';
// Обновляем разметку даты, чтобы привести ее в формат Месяц, День, Год

import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "../gql/query";
import NoteUser from "./NoteUser";

// Ограничиваем раширение до 800 px
const StyledNote = styled.article`
    max-width: 800px;
    margin: 0 auto;
`;

// Стилизуем метаданные заметки
const MetaData = styled.div`
    @media (min-width: 500px) {
        display: flex;
        align-items: top;
    }
`;

// Пространство между автором и метаданными
const MetaInfo = styled.div`
    padding-right: 1em;
`;

// Выравнивание по правой стороне экрана для больших экранов
const UserActions = styled.div`
    margin-left: auto;
`;

const Note = ({ note }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    if (loading) <p>Загрузка...</p>
    if (error) <p>Вы не вошли в сеть!</p>

    return (
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <img
                        src={note.author.avatar}
                        alt={note.author.username}
                        height="50px"
                    /> 
                </MetaInfo>
                <MetaInfo>
                    <em>от</em> { note.author.username } <br />
                    {format(note.createdAt, 'HH:mm:ss DD.MM.YYYY')}
                </MetaInfo>
                {data.isLoggedIn ? (
                    <UserActions>
                        <NoteUser note={note} />
                    </UserActions>
                ) : (
                    <UserActions>
                        <em>Лайков:</em> {note.favoriteCount}
                    </UserActions>
                )}
            </MetaData>
            <ReactMarkdown children={note.content} />
        </StyledNote>
    );
};

export default Note;