import React from "react";
import Product from "./Product";
import * as uuid from "uuid";

class Products extends React.Component {
    state = {
        isLoaded: false,
        products: [],
        filteredProducts: []
    };

    componentDidMount() {
        this.mounted = true;

        fetch("https://my-json-server.typicode.com/tdmichaelis/json-api/products")
            .then(response => response.json())
            .then(products => {
                if (this.mounted) {
                    this.setState({
                        isLoaded: true,
                        products,
                        filteredProducts: products
                    });
                }
            });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    renderProducts = () => {
        return this.state.filteredProducts.map(product => {
            return (
                <Product
                    key={uuid.v4()}
                    product={product}
                    products={this.state.products}
                />
            )
        });
    };

    filterProducts = (e) => {
        const regex = new RegExp(e.target.value, "i");
        const filteredProducts = this.state.products.filter(product => {
            return regex.test(product.title) || regex.test(product.category);
        });

        this.setState({
            filteredProducts
        });
    };

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
                    <div className="ui icon input" >
                        <input
                            type="text"
                            placeholder="Search..."
                            onKeyUp={this.filterProducts}
                        />
                        <i className="search icon">
                        </i>
                    </div>
                    <div className="ui hidden divider">
                    </div>
                    <div className="ui centered link cards">
                        {this.renderProducts()}
                    </div>
                </div>
            )
        }
    }
}

export default Products;