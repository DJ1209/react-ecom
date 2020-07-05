import React, { Component } from "react";
import { Button } from "reactstrap";

import { get } from "lodash";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ViewCart.css";
import { viewOrder } from "../../api/api";

class ViewOrder extends Component {
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
    viewOrder(localStorage.getItem("user_id"))
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
        <h3>Recent Order</h3>
        <ReactTable
          data={this.state.data}
          columns={this.columns}
          defaultPageSize={10}
        />
       
      </div>
    );
  }
}

export default ViewOrder;
