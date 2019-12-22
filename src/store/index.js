import { createStore } from "redux";

const reducer = (state, action) => {
    switch(action.type) {
        case "ADD_TO_CART":
            let tempCart = [...state.cart];
            if (!tempCart.find(obj => obj.product.id === action.product.id)) {
                tempCart.push({
                    product: action.product,
                    quantity: "1"
                });
                return {
                    cart: tempCart
                };
            }
            return state;
        case "REMOVE_FROM_CART":
            return {
                cart: state.cart.filter(obj => {
                    return obj.product.id !== action.id
                })
            };
        case "UPDATE_ITEM":
            return {
                cart: state.cart.map(obj => {
                    if (obj.product.id === action.id) {
                        return {
                            ...obj,
                            quantity: action.quantity
                        }
                    }

                    return obj;
                })
            };
        case "CONFIRM_PURCHASE":
            return {
                cart: []
            };
        default:
            return state;
    }
};

const initialState = {
    cart: []
};

const store = createStore(reducer, initialState);

export default store;