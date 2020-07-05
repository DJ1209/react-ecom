import React, { Component } from "react";
import { Button, Row, Label } from "reactstrap";
import { NavLink as Link } from "react-router-dom";

import { getProductDetails } from "../../api/api";

import "./ProductDetails.css";
import FeedbackModal from "../../common_components/Modal/FeedbackModal";
import AddToCartModal from "../../common_components/Modal/AddToCart";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_details: [],
      feedbackToggle: false,
      feedbackId: "",
      toggleCart: false
    };
  }
  componentDidMount() {
    this.getProductDetails();
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getProductDetails();
    }
  }
  getProductDetails() {
    let id = this.props.match.params.id;
    getProductDetails(id).then(res => {
      this.setState({ product_details: res.data.data });
    });
  }
  toggleFeedbackModal(toggle, id) {
    this.setState({ feedbackToggle: toggle, feedbackId: id });
  }
  toggleCartModal(toggle) {
    this.setState({ toggleCart: toggle });
  }
  render() {
    const {
      feedbackToggle,
      toggleCart,
      product_details,
      feedbackId
    } = this.state;
    const loggedIn = localStorage.getItem("user_id");
    return (
      <>
        <div className="product-detail-wrapper">
          {product_details.map((product_detail, key) => {
            return (
              <div className="box" key={key}>
                <Link
                  to={`/product-details/${product_detail.product_details_id}`}
                >
                  <h2>{product_detail.product_details_name}</h2>
                </Link>
                <Row>
                  
                  <span className="product-detail">
                    <h1>{product_detail.p_name}</h1>
                  </span>
                </Row>
                <Row>
                 
                  <span className="product-detail">
                    <img
                      alt="img"
                      height={300}
                      width={300}
                      src={`http://localhost:4000/upload/${product_detail.p_image}`}
                    />
                  </span>
                </Row>
               
                <Row>
                  <Label> Price : </Label>
                  <span className="product-detail">
                    ${product_detail.p_price}
                  </span>
                </Row>
                <Row>
                  <Label> Details : </Label>
                  <span className="product-detail  word-break">
                    {product_detail.p_details}
                  </span>
                </Row>
                <Row>
                {loggedIn && (
                  <>
                    <Button
                      className="cartButton"
                      color="info"
                      onClick={() => this.toggleCartModal(true, product_detail)}
                    >
                      Add to cart
                    </Button>
                  </>
                )}
                </Row>
              </div>
            );
          })}
        </div>
        {feedbackToggle && (
          <FeedbackModal
            close={toggle => this.toggleFeedbackModal(toggle)}
            toggle={feedbackToggle}
            product_id={feedbackId}
          />
        )}
        {toggleCart && (
          <AddToCartModal
            close={toggle => this.toggleCartModal(toggle)}
            toggle={toggleCart}
            product_detail={product_details}
          />
        )}
      </>
    );
  }
}

export default ProductDetails;
