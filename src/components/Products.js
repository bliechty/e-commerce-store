import React from "react";
import Product from "./Product";
import * as uuid from "uuid";

class Products extends React.Component {
    state = {
        products: [],
        filteredProducts: []
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.products.length === 0 && nextProps.products.length !== 0) {
            return {
                products: nextProps.products,
                filteredProducts: nextProps.products
            }
        } else {
            return {
                filteredProducts: prevState.filteredProducts
            }
        }
    }

    renderProducts = () => {
        if (this.state.filteredProducts.length === 0) {
            return (
                <div className="ui header">No products match your search</div>
            )
        }

        return this.state.filteredProducts.map(product => {
            return (
                <Product
                    key={uuid.v4()}
                    product={product}
                />
            )
        });
    };

    filterProducts = (e) => {
        let filteredProducts = [];

        if (!/\\/.test(e.target.value)) {
            const regex = new RegExp(e.target.value, "i");
            filteredProducts = this.props.products.filter(product => {
                return regex.test(product.title) || regex.test(product.category);
            });
        }

        this.setState({
            filteredProducts
        });
    };

    render() {
        if (this.props.products.length === 0) {
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