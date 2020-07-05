import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

import { getAllProductList } from "../../api/api";

import "./Product.css";
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_list: [],
      product_id: "",
      isOpen: false
    };
  }
  componentDidMount() {
    this.getProductList();
  }
  getProductList() {
    getAllProductList()
      .then(res => {
        this.setState({ product_list: res.data.data });
      })
      .catch(err => {
        console.log("Error while fetching product list", err);
      });
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    return (
      <>
        <div><div className="row">
          {this.state.product_list.map((product, key) => {
            return (
              <div className="col-sm-2">
              <div key={key} className="card">
                <div className="container">
                <Link to={`/product-details/${product._id}`}>
                <img
                       
                      height={250}
                      width={200}
                     
                      src={`http://localhost:4000/upload/${product.p_image}`}
                    />
                   <h1>{product.p_name}</h1>
                   <p className="price">${product.p_price}</p>
                   <p><button>Details</button></p>
                </Link>
                </div>
              </div>
              </div>
            );
          })}
       </div>
        </div>
      </>
    );
  }
}
export default ProductList;
