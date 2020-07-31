import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Header from "../components/header/Header";
import Routes from "./routes/Routes";
import {Provider} from "react-redux";
import {store} from "../bll/store";

const App = () => {

    return (
        <HashRouter>
            <Provider store={store}>
                <div className="App">
                    <Header/>
                    <Routes/>
                </div>
            </Provider>
        </HashRouter>
    );

};

export default App;
