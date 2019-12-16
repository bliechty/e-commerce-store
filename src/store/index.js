import { combineReducers, createStore } from "redux";

const initialState = {
    products: "products"
};

const reducer = (state, action) => {
    switch(action.type) {
        case "ADD_PRODUCT_FROM_CART":
            break;
        case "REMOVE_PRODUCT_FROM_CART":
            break;
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;