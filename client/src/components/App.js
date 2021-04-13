import React, {Component} from "react";
import {Router} from "@reach/router";
import NotFound from "./pages/NotFound.js";
// import Skeleton from "./pages/Skeleton.js";

import "../utilities.css";
import "./App.css";

// import {socket} from "../client-socket.js";
//
// import {get, post} from "../utilities";
import Landing from "./pages/Landing";

/**
 * Define the "App" component as a class.
 */
function App() {
    return (
        <div className="App">
            <Router>
                <Landing path="/"/>
                <NotFound default/>
            </Router>
        </div>
    );
}

export default App;
