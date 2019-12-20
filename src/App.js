import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./components/HomePage";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom"

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <div className="ui secondary pointing menu">
                        <Link to="/products">
                            <div className="item">Products</div>
                        </Link>
                        <div className="right menu">
                            <Link to="/cart">
                                <div className="item">
                                    <i className="fas fa-shopping-cart">
                                    </i>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/">
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
                </Router>
            </div>
        )
    }
}

const WrappedApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default WrappedApp;