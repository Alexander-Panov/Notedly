/* Старый тестировочный Home*/
// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//     return(
//         <div>
//             <h1>Notedly</h1>
//             <p>This is the home page</p>
//             { /* */ }
//             <ul>
//                 <li>
//                     <Link to="/mynotes">My Notes</Link>
//                 </li>
//                 <li>
//                     <Link to="/favorites">Favorites</Link>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default Home;

/* Новый с компонентами UI */
// import React from 'react';

// import Header from '../src/components/header';
// import Navigation from '../src/components/navigation';

// const Home = () => {
//     return (
//         <div>
//             <Header />
//             <Navigation />
//             <p>This is a home page</p>
//         </div>
//     )
// };

// export default Home;


/* Компонент уже обернутый в макет */

import React from 'react';

import Button from '../src/components/Button';
import NoteFeed from '../src/components/NoteFeed';

import { useQuery, gql } from '@apollo/client';

import ReactMarkdown from 'react-markdown';

import { GET_NOTES } from '../src/gql/query';

const Home = () => {
    // Хук запроса
    // data
    // loading - true при получении данных (Позволяет отображать индикатор загрузки)
    // error - ошибка, в случае провала получения данных
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
    if (loading) return <p>Загрузка...</p>
    if (error) return <p>Ошибка: При получении данных произошел сбой</p>
    return (
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {// Если hasNextPage - true, отрисовать кнопку загрузить еще
            data.noteFeed.hasNextPage && (
                <Button
                    onClick={() => 
                        fetchMore({
                            variables: {
                                cursor: data.noteFeed.cursor
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                        // Совмещаем новые результаты со старыми
                                        notes: [
                                            ...previousResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes
                                        ],
                                        __typename: 'noteFeed'
                                    }
                                };
                            }
                        })
                    }>Загрузить еще</Button>
            )}
        </React.Fragment>
        );
    
};

export default Home;