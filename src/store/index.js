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
                    ...state,
                    cart: tempCart
                };
            }
            return state;
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(obj => {
                    return obj.product.id !== action.id
                })
            };
        case "UPDATE_ITEM":
            return {
                ...state,
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
                ...state,
                cart: []
            };
        case "SET_USERNAME":
            return {
                ...state,
                username: action.username
            };
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.products,
                filteredProducts: action.products
            };
        case "SET_PRODUCT_DETAILS":
            return {
                ...state,
                product: state.products.find(p => {
                    return p.id === Number(this.props.match.params.productId);
                })
            };
        default:
            return state;
    }
};

const initialState = {
    cart: [],
    username: ""
};

const store = createStore(reducer, initialState);

export default store;