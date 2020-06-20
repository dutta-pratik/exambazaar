import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

import logo from "../logo.svg"
import "../App.css";
import App from "./App"; 
import HomePage from "./HomePage";

function NavBar () {
    return (
        <div className="navbar">
            <Router>
                <div className="home">
                <Link to={`/`}>
                   <img src={logo} alt="home" className="logo"></img>
                </Link>
                </div>
                {/* <Route  path="/" component={App} />  */}
            </Router>
            
        </div>
    );
}

export default NavBar;