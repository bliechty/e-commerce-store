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
    state = {
        products: []
    };

    componentDidMount() {
        fetch("https://my-json-server.typicode.com/tdmichaelis/json-api/products")
            .then(response => response.json())
            .then(products => {
                this.setState({
                    products
                });
            });
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/login" />} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route render={(props) => <DefaultContainer {...props} products={this.state.products} />} />
                </Switch>
            </Router>
        )
    }
}

const DefaultContainer = (properties) => {
    return (
        <>
            <Navigation/>
            <Switch>
                <Route path="/home" render={(props) => <HomePage {...props} products={properties.products} /> } />
                <Route exact path="/products/" render={(props) => <Products {...props} products={properties.products} />} />
                <Route path="/products/:productId" render={(props) => <ProductDetails {...props} products={properties.products} />} />
                <Route path="/cart" render={(props) => <Cart {...props} products={properties.products} />} />
                <Route render={() => <div>404 not found</div>}/>
            </Switch>
        </>
    )
};

const WrappedApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default WrappedApp;