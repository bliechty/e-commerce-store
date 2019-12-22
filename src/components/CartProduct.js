import React from "react";

class CartProduct extends React.Component {
    render() {
        let url = `${this.props.item.img};maxHeight=144;maxWidth=180`;

        return (
            <div className="ui segment">
                <div className="ui divider hidden">
                </div>
                <div className="ui very relaxed grid middle aligned">
                    <div className="six wide column">
                        <div className="ui grid center aligned">
                            <div className="image">
                                <img src={url} alt={url} />
                            </div>
                        </div>
                    </div>
                    <div className="ten wide column">
                        <div className="list">
                            <div className="ui header">{this.props.item.title}</div>
                            <li>Price: ${this.props.item.price}</li>
                        </div>
                        <div className="ui divider hidden">
                        </div>
                        <select id={this.props.item.id}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button className="positive ui button">
                            Update Item
                        </button>
                        <button className="ui negative basic button">
                            Delete Item
                        </button>
                    </div>
                </div>
                <div className="ui divider hidden">
                </div>
            </div>
        )
    }
}

export default CartProduct;