import React from "react";
import store from "../store";
import * as uuid from "uuid";

class Products extends React.Component {
    state = {
        products: [],
        filteredProducts: []
    };

    componentDidMount() {
        fetch("https://my-json-server.typicode.com/tdmichaelis/json-api/products")
            .then(response => response.json())
            .then(products => this.setState({
                products,
                filteredProducts: products
            }));
    }

    renderProducts = () => {
        return this.state.filteredProducts.map(product => {
            let url = `${product.img};maxHeight=160;maxWidth=200`;
            return (
                <div key={uuid.v4()} title={product.title} className="card">
                    <div className="content">
                        <div className="image center aligned">
                            <img src={url} alt={product.img} />
                        </div>
                    </div>
                    <div className="extra content">
                        <div className="header">{product.title}</div>
                        <div className="meta">
                            <span>Description</span>
                        </div>
                        <div className="description">
                            {product.description}
                        </div>
                    </div>
                </div>
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

export default Products;