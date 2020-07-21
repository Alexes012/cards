import React from 'react';
import {Switch, Route} from "react-router-dom";
import Profile from "../../components/01_Profile/ui/Profile";
import Login from "../../components/02_Login/ui/Login";
import Registration from "../../components/03_Registration/ui/Registration";
import Forgot from "../../components/04_ForgotPassword/ui/Forgot";
import Decks from "../../components/05_Decks/ui/Decks";


type PageType = {
    id: number;
    title: string;
    path?: string;
    exact?: boolean;
    component: any;
};

const pages: Array<PageType> = [
    {id: 0, title: 'profile', path: '/profile', component: () => <Profile/>},
    {id: 1, title: 'login', path: '/login', component: () => <Login/>},
    {id: 2, title: 'registration', path: '/registration', component: () => <Registration/>},
    {id: 3, title: 'forgot', path: '/forgot', component: () => <Forgot/>},
    {id: 4, title: 'decks', path: '/decks', component: () => <Decks/>},
];


const Routes = () => {
    return (
        <Switch>
            {pages.map(p => (
                <Route
                    key={p.id}
                    path={p.path}
                    exact={p.exact}
                    render={p.component}
                />
            ))}
        </Switch>
    )
};

export default Routes;