import { Link } from "react-router-dom";
import React from "react";
import store from "../store";

class Navigation extends React.Component {
    render() {
        let username = store.getState().username;
        let logInDisplay =  "";

        if (!username) {
            logInDisplay = (
                <Link to="/login">
                    <div className="item">Log In</div>
                </Link>
            );
        } else {
            logInDisplay = (
                <div className="item">Hello, {username}!</div>
            );
        }

        return (
            <div className="ui secondary pointing menu" id="nav-bar">
                <Link to="/home">
                    <div className="item">Home</div>
                </Link>
                <Link to="/products">
                    <div className="item">Products</div>
                </Link>
                <div className="right menu">
                    <Link to="/cart">
                        <div className="item">
                            <i className="shop icon">
                            </i>
                            Cart
                        </div>
                    </Link>
                </div>
                {logInDisplay}
            </div>
        )
    }
}

export default Navigation;