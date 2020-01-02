import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./components/HomePage";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import LoginPage from "./components/LoginPage";
import Navigation from "./components/Navigation";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={LoginContainer}/>
                    <Route component={DefaultContainer}/>
                </Switch>
            </Router>
        )
    }
}

const LoginContainer = () => (
    <>
        <Route path="/login" component={LoginPage} />
    </>
);

const DefaultContainer = () => (
    <>
        <Navigation />
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/home">
                <HomePage />
            </Route>
            <Route exact path="/products/">
                <Products />
            </Route>
            <Route path="/products/:productId" component={ProductDetails}/>
            <Route path="/cart">
                <Cart />
            </Route>
            <Route render={() => <div>404 not found</div>} />
        </Switch>
    </>
);

const WrappedApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default WrappedApp;