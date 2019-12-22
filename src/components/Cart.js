import React from "react";
import CartProduct from "./CartProduct";
import store from "../store";
import * as uuid from "uuid";

class Cart extends React.Component {
    state = {
        cart: store.getState().cart,
        confirmPurchase: false
    };

    deleteItem = (id) => {
        store.dispatch({
            type: "REMOVE_FROM_CART",
            id,
        });
        this.setState({
            cart: store.getState().cart
        })
    };

    confirmPurchase = () => {
        store.dispatch({
            type: "CONFIRM_PURCHASE"
        });
        this.setState({
            cart: [],
            confirmPurchase: true
        });
    };

    iterateCart = () => {
        return this.state.cart.map(obj => {
            return (
                <CartProduct
                    product={obj.product}
                    key={uuid.v4()}
                    deleteItem={this.deleteItem}
                    updateItem={this.updateItem}
                    quantity={obj.quantity}
                />
            )
        });
    };

    render() {
        if (this.state.confirmPurchase) {
            return (
                <div className="ui container">
                    <div className="ui success message">
                        <div className="header">
                            Thank you for your purchase!
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.cart.length === 0) {
            return (
                <>
                    <div className="ui hidden divider">
                    </div>
                    <div className="ui grid center aligned header">Nothing is in your cart</div>
                </>
            )
        }  else {
            return (
                <div className="ui container">
                    {this.iterateCart()}
                    <button className="positive ui button big right floated"
                            onClick={this.confirmPurchase}>Confirm Purchase</button>
                </div>
            )
        }
    }
}

export default Cart;