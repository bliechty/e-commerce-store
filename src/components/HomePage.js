import React from "react";
import Product from "./Product";
import * as uuid from "uuid";

class HomePage extends React.Component {
    state  = {
        featuredProducts: [],
        isLoaded: false
    };

    componentDidMount() {
        this.mounted = true;

        fetch("https://my-json-server.typicode.com/tdmichaelis/json-api/products")
            .then(response => response.json())
            .then(products => {
                if (this.mounted) {
                    const featuredProducts = products.filter(p => {
                        return p.category === "action-camera"
                    });
                    this.setState({
                        isLoaded: true,
                        featuredProducts
                    });
                }
            });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    renderFeaturedProducts() {
        return this.state.featuredProducts.map(product => {
            return (
                <Product
                    key={uuid.v4()}
                    product={product}
                    products={this.state.products}
                />
            )
        });
    }

    render() {
        const isLoaded = this.state.isLoaded;
        if (!isLoaded) {
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