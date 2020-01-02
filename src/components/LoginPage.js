import React from "react";
import store from "../store";
import "../index.css";

class LoginPage extends React.Component {
    state = {
        loginError: "",
        value: ""
    };

    authorization = () => {
        const username = document.getElementById("username").value;
        if (username) {
            store.dispatch({
                type: "SET_USERNAME",
                username
            });
            this.props.history.push("/home");
        } else {
            this.setState({loginError: "Input is empty"});
        }
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    render() {
        return (
            <div id="segment-container">
                <div className="ui segment very padded">
                    <div className="content">
                        <div className="ui labeled input">
                            <div className="ui label">
                                Username:
                            </div>
                            <input
                                type="text"
                                id="username"
                                className="float right"
                                onChange={this.onChange}
                                value={this.state.value}
                            />
                        </div>
                        <div className="ui divider hidden">
                        </div>
                        <button onClick={this.authorization} className="positive ui basic button fluid">Log In</button>
                        <span>{this.state.loginError}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;