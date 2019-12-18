import React from "react";
import store from "../store";
import * as uuid from "uuid";

class Products extends React.Component {
    state = {
        inputValue: ""
    };

    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    }

    renderProducts = () => {
        return store.getState().products.map(product => {
            let url = `${product.img};maxHeight=160;maxWidth=200`;
            return (
                <div key={uuid.v4()} className="card">
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
        })
    };

    onChange = (e) => {
        this.setState({
            inputValue: e.target.value,
        })
    };

    handleSearch = (e) => {
        if (e.key === "Enter") {
            console.log('enter');
        }
    };

    render() {
        return (
            <div>
                <div className="ui icon input" >
                    <input
                        type="text"
                        placeholder="Search..."
                        onKeyUp={this.handleSearch}
                        onChange={this.onChange}
                        value={this.state.inputValue}
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