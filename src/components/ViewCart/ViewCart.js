import React, { Component } from "react";
import { Button } from "reactstrap";

import { get } from "lodash";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ViewCart.css";
import { getCart } from "../../api/api";

class ViewCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.getCart();
  }
  getCart() {
    getCart(localStorage.getItem("user_id"))
      .then(res => this.setState({ data: res.data.data }))
      .catch(err => console.log("err", err));
  }
  columns = [
    ///{ Header: "Product Id", accessor: "product_id" },
    { Header: "Product Name", accessor: "p_name" },
    { Header: "Price", accessor: "p_price" },
    { Header: "Quantity", accessor: "p_qty" }
  ];
  render() {
    const id = localStorage.getItem("user_id");
    return (
      <div className="view-cart-wrapper">
        <h3>View Your Cart</h3>
        <ReactTable
          data={this.state.data}
          columns={this.columns}
          defaultPageSize={7}
        />
        <Button
          className="button"
          onClick={() => this.props.history.push(`/user-profile/${id}`)}
        >
          Back to Profile
        </Button>
        <br/>
        <Button
          className="button"
          onClick={() => this.props.history.push(`/confirm-order`)}
        >
          Confirm Order
        </Button>
      </div>
    );
  }
}

export default ViewCart;
