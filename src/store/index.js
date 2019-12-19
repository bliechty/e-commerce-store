import { createStore } from "redux";

const reducer = (state, action) => {
    switch(action.type) {
        case "ADD_TO_CART":
            return state;
        case "REMOVE_FROM_CART":
            return state;
        case "UPDATE_ITEM_IN_CART":
            return state;
        case "CONFIRM_PURCHASE":
            return {
                ...state,
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