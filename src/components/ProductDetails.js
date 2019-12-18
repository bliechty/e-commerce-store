import React from "react";

const ProductDetails = (props) => {
    return (
        <div>Product {props.match.params.productId}</div>
    )
};

export default ProductDetails;