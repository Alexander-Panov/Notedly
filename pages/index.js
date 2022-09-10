/* Маршрутизация */

import React, { Component } from "react";
// Импортируем зависимости маршрутизации, Добавим библиотеку Redirect
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Импортируем общий макет
import Layout from "../src/components/Layout";

// Импортируем маршруты
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import NotePage from "./note";
import SignUp from "./signup";
import SignIn from "./signin";
import NewNote from "./new";
import EditNote from "./edit";

import { useQuery, gql } from "@apollo/client";

import { IS_LOGGED_IN } from "../src/gql/query";

// Маршрут включает в себя параметр id, через :id

// Определяем маршруты
const Pages = () => {
    return ( //exact - домашний компонент отображается только для корневого URL
        <Router>
            {/* Обернем маршруты в Layout */}
            <Layout>
                <Route exact path="/" component={Home}/> 
                <PrivateRoute path="/mynotes" component={MyNotes}/>
                <PrivateRoute path="/favorites" component={Favorites}/>
                <Route path="/note/:id" component={NotePage}/>
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <PrivateRoute path="/new" component={NewNote} />
                <PrivateRoute path="/edit/:id" component={EditNote} />
            </Layout>
        </Router>
    )
};

// Защищенные маршруты - те, доступные только авторизованным пользователям
const PrivateRoute = ({ component: Component, ...rest}) => {
    const {loading, error, data} = useQuery(IS_LOGGED_IN);
    if (loading) return <p>Загрузка...</p>
    if (error) return <p>Ошибка!</p>
    return(
        <Route
            {...rest}
            render={props =>
                data.isLoggedIn === true? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

export default Pages;