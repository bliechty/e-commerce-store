import React from "react";
import store from "../store";

class ProductDetails extends React.Component {
    state = {
        addedToCart: ""
    };

    addToCart = (product) => {
        store.dispatch({
            type: "ADD_TO_CART",
            product
        });
        this.setState({
            addedToCart: "Added to cart!"
        });
    };

    render() {
        if (this.props.products.length === 0) {
            return (
                <div className="ui active centered inline loader">
                </div>
            )
        } else {
            const product = this.props.products.find(p => {
                return p.id === Number(this.props.match.params.productId);
            });
            const url = `${product.img};maxHeight=336;maxWidth=420`;
            return (
                <div className="ui container">
                    <div className="ui divider hidden">
                    </div>
                    <div className="ui very relaxed grid middle aligned">
                        <div className="six wide column">
                            <div className="ui grid center aligned">
                                <div className="image">
                                    <img src={url} alt={product.title} />
                                </div>
                            </div>
                        </div>
                        <div id="info" className="ten wide column">
                            <div className="list">
                                <div className="ui header">{product.title}</div>
                                <li>Price: ${product.price}</li>
                                <li className="description">Description: {product.description}</li>
                                <li>Category: {product.category}</li>
                                <li>Rating: {product.rating}</li>
                            </div>
                            <div className="ui divider hidden">
                            </div>
                            <button className="ui teal labeled icon button" onClick={() => this.addToCart(product)}>
                                <i className="cart icon">
                                </i>
                                Add To Cart
                            </button>
                            <span>{this.state.addedToCart}</span>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ProductDetails;