import React, { Component } from "react";
import { Col, Row, Label, Button } from "reactstrap";
import { NavLink as Link } from "react-router-dom";

import { getProductList, getAllProductList } from "../../api/api";

import "./ProductDetails.css";
import FeedbackModal from "../../common_components/Modal/FeedbackModal";
import AddToCartModal from "../../common_components/Modal/AddToCart";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_product_list: [],
      product: [],
      feedbackId: "",
      feedbackToggle: "",
      toggleCart: false
    };
  }
  componentDidMount() {
    this.getAllProductList();
    this.getProductList();
  }

  getAllProductList() {
    getAllProductList()
      .then(res => {
        this.setState({ all_product_list: res.data.data });
      })
      .catch(err => {
        console.log("Error while fetching product list", err);
      });
  }
  getProductList() {
    let id = this.props.match.params.id;
    getProductList(id)
      .then(res => {
        this.setState({ product: res.data.data });
        return res;
      })
      .catch(err => {
        console.log("err::", err);
      });
  }
  toggleFeedbackModal(toggle, id) {
    this.setState({ feedbackToggle: toggle, feedbackId: id });
  }
  toggleCartModal(toggle) {
    this.setState({ toggleCart: toggle });
  }
  render() {
    const { feedbackToggle, product, feedbackId, toggleCart } = this.state;
    const loggedIn = localStorage.getItem("user_id");

    return (
      <div className="product-wrapper">
        {product.map((product, key) => {
          return (
            <div className="box" key={key}>
              <div className="top-headings">
                <Link to={`/product-details/${product._id}`}>
                  <h2>{product.p_name}</h2>
                </Link>
              </div>

              <Row>
                <Label>Product Details : </Label>
                <span className="product-detail">
                  {product.p_details}
                </span>
              </Row>
              <Row>
                <Label>Product Quantity : </Label>
                <span className="product-detail">
                  {product.p_quantity}
                </span>
              </Row>
              <Row>
                <Label>Product Price : </Label>
                <span className="product-detail">{product.p_price}</span>
              </Row>
              <Row>
                <Label>Product Image : </Label>
                <img alt="img" className="myimgdetails" src={`http://localhost:4000/upload/${product.p_image}`} />
              </Row>
              {loggedIn ? (
                <>
                
                  <Button
                    color="info"
                    className="cartButton"
                    onClick={() => this.toggleCartModal(true, product)}
                  >
                    Add to cart
                  </Button>
                </>
              ) : null}
            </div>
          );
        })}
        {feedbackToggle && (
          <FeedbackModal
            toggle={feedbackToggle}
            close={toggle => this.toggleFeedbackModal(toggle)}
            product_id={feedbackId}
          />
        )}
        {toggleCart && (
          <AddToCartModal
            close={toggle => this.toggleCartModal(toggle)}
            toggle={toggleCart}
            product_detail={product}
          />
        )}
      </div>
    );
  }
}

export default Product;
