/* 1 Версия App - тестировочная */
// const App = () => {
//     return(
//         <div>
//             <h1>Hello, Notedly!</h1>
//             <p>Welcome to the Notedly application</p>
//         </div>
//     )
// }



// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';

import Pages from '../pages';
import GlobalStyle from './components/GlobalStyle';

// Импортируем библиотеки Apollo Client
import { 
    ApolloClient, 
    ApolloProvider, 
    createHttpLink,
    InMemoryCache
 } from '@apollo/client';

import { setContext } from 'apollo-link-context';

//"http://localhost:4000/api"
const uri = process.env.API_URI; // Бандлер кода Parcel используется, когда нам нужно сослаться на переменную .env
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();  // Инициирование кэша

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true // Активация локальных инструментов разработчика Apollo
})

// Выполним проверку локального токена
const data = {
    isLoggedIn: !!localStorage.getItem('token')
}

//Записываем данные из кэша при начальной загрузке
cache.writeData({ data });
// Записываем данные кэша после его сброса
client.onResetStore(() => cache.writeData({ data }))

// Подключим наше приложение React к Apollo Client, обернув его в Apollo Provider
const App = () => {
    return(
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))