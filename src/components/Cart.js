import React from "react";
import CartProduct from "./CartProduct";
import store from "../store";
import * as uuid from "uuid";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.confirmPurchase = false;
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    completePurchase = () => {
        store.dispatch({
            type: "CONFIRM_PURCHASE"
        });
        this.confirmPurchase = true;
    };

    iterateCart = () => {
        return store.getState().cart.map(obj => {
            return (
                <CartProduct
                    product={obj.product}
                    key={uuid.v4()}
                    deleteItem={this.deleteItem}
                    quantity={obj.quantity}
                />
            )
        });
    };

    render() {
        let username = store.getState().username;
        let message =  "";

        if (!username) {
            message = "Thank you for your purchase!";
        } else {
            message = `Thank you for your purchase, ${username}!`;
        }

        if (this.confirmPurchase) {
            return (
                <div className="ui container">
                    <div className="ui success message">
                        <div className="header">
                            {message}
                        </div>
                    </div>
                </div>
            )
        } else if (store.getState().cart.length === 0) {
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
                            onClick={this.completePurchase}>Confirm Purchase</button>
                </div>
            )
        }
    }
}

export default Cart;