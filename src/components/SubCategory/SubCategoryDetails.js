import React, { Component } from "react";
import { Col, Row, Label } from "reactstrap";
import { NavLink as Link } from "react-router-dom";

import { getSubCategoryList, getProductList } from "../../api/api";

import "./CategoryDetails.css";

class SubCategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sub_category: [],
      product_list: []
    };
  }
  componentDidMount() {
    this.getSubCategoryList();
    this.getProductList();
  }
  getProductList() {
    getProductList()
      .then(res => {
        this.setState({ product_list: res.data.data });
      })
      .catch(err => {
        console.log("Error while fetching product list", err);
      });
  }
  componentDidUpdate(nextstate) {
    if (this.props.match.params.id !== nextstate.match.params.id) {
      this.getSubCategoryList();
    }
  }
  getSubCategoryList() {
    let id = this.props.match.params.id;
    getSubCategoryList(id)
      .then(res => {
        this.setState({ sub_category: res.data.data });
      })
      .catch(err => {
        console.log("err::", err);
      });
  }
  render() {
    const { sub_category } = this.state;
    return (
      <div className="sub-category-wrapper">
        {sub_category.map((sub_category, key) => {
          return (
            <div className="box" key={key}>
              <Col>
                <Link to={`/sub-category/${sub_category._id}`}>
                  <h2>{sub_category.sub_category_name}</h2>
                </Link>
                <Row>
                  <Label>Sub Category Name : </Label>
                  <span className="product-detail">
                    {sub_category.sub_category_name}
                  </span>
                </Row>
                <Row>
                  <Label>Sub Category Image : </Label>
                  <img
                    alt="img"
                    height={50}
                    width={100}
                    src={`http://localhost:5000/upload/${sub_category.sub_category_image}`}
                  />
                </Row>
              </Col>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SubCategoryDetails;
