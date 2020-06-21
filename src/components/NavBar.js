import React from "react";

import "../App.css";

import logo from "../logo.svg"


function NavBar () {
    return (
        <div className="navbar">
            <img src={logo} alt="home" className="logo"></img>
        
        </div>
    );
}

export default NavBar;