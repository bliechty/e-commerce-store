import React from "react";
import Product from "./Product";
import * as uuid from "uuid";

class HomePage extends React.Component {
    renderFeaturedProducts() {
        return this.props.products.filter(product => {
            return product.category === "action-camera"
        }).map((product) => {
            return (
                <Product
                    key={uuid.v4()}
                    product={product}
                />
            )
        });
    }

    render() {
        if (this.props.products.length === 0) {
            return (
                <div className="ui active centered inline loader">
                </div>
            )
        } else {
            return (
                <div>
                    <div className="ui hidden divider">
                    </div>
                    <div className="ui grid center aligned header">Featured Products:</div>
                    <div className="ui grid center aligned">Click the products link in the top left to see full product list</div>
                    <div className="ui hidden divider">
                    </div>
                    <div className="ui centered link cards">
                        {this.renderFeaturedProducts()}
                    </div>
                </div>
            )
        }
    }
}

export default HomePage;