import React from "react";

class ProductDetails extends React.Component {
    state = {
        isLoaded: false,
        product: {}
    };

    componentDidMount() {
        this.mounted = true;

        fetch("https://my-json-server.typicode.com/tdmichaelis/json-api/products")
            .then(response => response.json())
            .then(products => {
                if (this.mounted) {
                    const product = products.find(p => {
                        return p.id === Number(this.props.match.params.productId);
                    });
                    if (product !== undefined) {
                        this.setState({
                            isLoaded: true,
                            product
                        });
                    }
                }
            });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const isLoaded = this.state.isLoaded;

        if (!isLoaded) {
            return (
                <div className="ui active centered inline loader">
                </div>
            )
        } else {
            const product = this.state.product;
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
                        <div className="ten wide column">
                            <div className="content">
                                <div className="ui header">{product.title}</div>
                                <div>Price: ${product.price}</div>
                                <div className="description">Description: {product.description}</div>
                                <div>Category: {product.category}</div>
                                <div>Rating: {product.rating}</div>
                            </div>
                            <div className="ui divider hidden">
                            </div>
                            <button className="ui teal labeled icon button">
                                <i className="cart icon">
                                </i>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ProductDetails;