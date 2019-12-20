import React from "react";
import { useHistory } from "react-router-dom";

const Product = (props) => {
    let history = useHistory();

    const viewProduct = () => {
        history.push(`/products/${props.product.id}`);
    };

    let url = `${props.product.img};maxHeight=160;maxWidth=200`;
    return (
        <div onClick={viewProduct} title={props.product.title} className="card">
            <div className="content">
                <div className="image center aligned">
                    <img src={url} alt={props.product.img} />
                </div>
            </div>
            <div className="extra content">
                <div className="header">{props.product.title}</div>
                <div className="meta">
                    <span>Description</span>
                </div>
                <div className="description">
                    {props.product.description}
                </div>
            </div>
        </div>
    )
};

export default Product;