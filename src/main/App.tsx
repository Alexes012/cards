import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Header from "../components/header/Header";
import Routes from "./routes/Routes";

const App = () => {

        return (
            <HashRouter>
                <div className="App">
                    <Header/>
                    <Routes/>
                    <div>gggggg</div>
                </div>
            </HashRouter>
        );

};

export default App;
