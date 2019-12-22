import React from "react";
import { Dropdown } from "semantic-ui-react";
import store from "../store";

class CartProduct extends React.Component {
    state = {
        value: this.props.quantity,
        updateItem: ""
    };

    constructor(props) {
        super(props);
        this.amount = [
            { key: "1", value: "1", text: "1" },
            { key: "2", value: "2", text: "2" },
            { key: "3", value: "3", text: "3" },
            { key: "4", value: "4", text: "4" },
            { key: "5", value: "5", text: "5" }
        ]
    }

    deleteItem = (id) => {
        this.props.deleteItem(id);
    };

    updateItem = (id, quantity) => {
        store.dispatch({
            type: "UPDATE_ITEM",
            id,
            quantity
        });
        this.setState({
            updateItem: "Item updated!"
        })
    };

    onChange = (e) => {
        if (e.target.querySelector("span") === null) {
            this.setState({
                value: e.target.innerText,
                updateItem: ""
            });
        } else {
            this.setState({
                value: e.target.querySelector("span").innerText,
                updateItem: ""
            });
        }
    };

    render() {
        const url = `${this.props.product.img};maxHeight=144;maxWidth=180`;

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
                            <div className="ui header">{this.props.product.title}</div>
                            <li>Price: ${this.props.product.price}</li>
                        </div>
                        <div className="ui divider hidden">
                        </div>
                        <Dropdown
                            value={this.state.value}
                            selection
                            compact
                            options={this.amount}
                            id={"select" + this.props.product.id}
                            onChange={this.onChange}
                        />
                        <button className="positive ui button"
                                onClick={() => this.updateItem(this.props.product.id, this.state.value)}>
                            Update Item
                        </button>
                        <span>{this.state.updateItem}</span>
                        <button className="ui negative basic button" onClick={() => this.deleteItem(this.props.product.id)}>
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