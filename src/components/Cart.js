import React from "react";
import CartProduct from "./CartProduct";
import store from "../store";
import * as uuid from "uuid";

class Cart extends React.Component {
    state = {
        cart: store.getState().cart
    };

    iterateCart = () => {
        return this.state.cart.map(item => {
            return (
                <CartProduct
                    item={item}
                    key={uuid.v4()}
                />
            )
        });
    };

    render() {
        return (
            <div className="ui container">
                {this.iterateCart()}
            </div>
        )
    }
}

export default Cart;