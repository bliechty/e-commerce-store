import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import ProductDetails from "./components/ProductDetails";
import fetchMock from "fetch-mock";
import store from "./store";
import Cart from "./components/Cart";
import products from "./productsList";

describe("App", () => {
    describe("Product Details", () => {
        beforeEach(() => {
            fetchMock.get("https://my-json-server.typicode.com/tdmichaelis/json-api/products",
                [
                    {
                        "id": 1,
                        "title": "Toshiba - 49” Class – LED - 1080p",
                        "description": "Toshiba HDTV Fire TV Edition is a new generation of smart TVs featuring the Fire TV experience built-in and including a Voice Remote with Alexa.",
                        "img": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6211/6211009_sd.jpg",
                        "price": 199.99,
                        "rating": 4.6,
                        "category": "tv"
                    }
                ]
            );
        });

        afterEach(() => {
            fetchMock.reset();
        });

        it("Should have a product title, add to cart button and image", done => {
            const match = { params: { productId: "1" } };
            const wrapper = shallow(<ProductDetails
                                        products={products}
                                        match={match}
                                    />);
            setTimeout(() => {
                expect(wrapper.find("button").text()).toBe("Add To Cart");
                expect(wrapper.find("div.ui.header").text()).toBe("Toshiba - 49” Class – LED - 1080p");
                expect(wrapper.containsMatchingElement(<img />)).toBe(true);
                done();
            })
        });

        it("Should successfully add an item to the redux store", done => {
            const match = { params: { productId: "1" } };
            const wrapper = shallow(<ProductDetails
                                        products={products}
                                        match={match}
                                    />);
            setTimeout(() => {
                wrapper.find("button").simulate("click");
                const cart = store.getState().cart;
                expect(cart.length).toBe(1);
                expect(cart[0].product.title).toBe("Toshiba - 49” Class – LED - 1080p");
                done();
            })
        });
    });

    describe("Cart", () => {
        it("should successfully remove an item from the store and dom", () => {
            store.dispatch({
                type: "ADD_TO_CART",
                product: {
                    "id": 1,
                    "title": "Toshiba - 49” Class – LED - 1080p",
                    "description": "Toshiba HDTV Fire TV Edition is a new generation of smart TVs featuring the Fire TV experience built-in and including a Voice Remote with Alexa.",
                    "img": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6211/6211009_sd.jpg",
                    "price": 199.99,
                    "rating": 4.6,
                    "category": "tv"
                }
            });
            store.dispatch({
                type: "ADD_TO_CART",
                product: {
                    "id": 2,
                    "title": "LG - 75” Class - LED - UK6190 Series - 2160p",
                    "description": "Stream high-definition shows and watch movies with this LG 4K UHD smart TV. Its quad-core processor ensures a clear picture and reduces distracting video noise, while the webOS lets you connect to popular streaming networks.",
                    "img": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6290/6290163_sd.jpg",
                    "price": 999.99,
                    "rating": 4.7,
                    "category": "tv"
                }
            });
            let cart = store.getState().cart;
            expect(cart.length).toBe(2);
            const wrapper = mount(<Cart />);
            wrapper.find("button.negative").first().simulate("click");
            cart = store.getState().cart;
            expect(cart.length).toBe(1);
            expect(cart[0].product.title).toBe("LG - 75” Class - LED - UK6190 Series - 2160p");
        });

        it("should successfully update an item", () => {
            store.dispatch({
                type: "ADD_TO_CART",
                product: {
                    "id": 1,
                    "title": "Toshiba - 49” Class – LED - 1080p",
                    "description": "Toshiba HDTV Fire TV Edition is a new generation of smart TVs featuring the Fire TV experience built-in and including a Voice Remote with Alexa.",
                    "img": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6211/6211009_sd.jpg",
                    "price": 199.99,
                    "rating": 4.6,
                    "category": "tv"
                }
            });
            store.dispatch({
                type: "UPDATE_ITEM",
                id: 1,
                quantity: 3
            });
            expect(store.getState().cart[0].quantity).toBe(3);
            const wrapper = mount(<Cart />);
            const e = wrapper.find("#select1").at(0);
            const text = e.props().value;
            expect(text).toBe(3);
        });
    });
});