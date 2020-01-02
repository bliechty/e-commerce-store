import { Link } from "react-router-dom";
import React from "react";
import store from "../store";

class Navigation extends React.Component {
    render() {
        let username = store.getState().username;
        let welcomeMessage =  "";

        if (!username) {
            welcomeMessage = "Not logged in";
        } else {
            welcomeMessage = `Hello, ${username}!`;
        }

        return (
            <div className="ui secondary pointing menu">
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
                <div className="item">
                    {welcomeMessage}
                </div>
            </div>
        )
    }
}

export default Navigation;