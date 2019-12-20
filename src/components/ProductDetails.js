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
            return <div>Loading...</div>;
        } else {
            const url = `${this.state.product.img};maxHeight=160;maxWidth=200`;
            return (
                <img src={url} alt={this.state.product.title} />
            )
        }
    }
}

export default ProductDetails;