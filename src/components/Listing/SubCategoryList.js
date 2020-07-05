import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import { getAllSubCategoryList, getSubCategoryList } from "../../api/api";

class SubCategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sub_category: []
    };
  }
  componentDidMount() {
    this.getAllSubCategoryList();
  }
  getAllSubCategoryList() {
    getAllSubCategoryList()
      .then(res => {
        this.setState({ sub_category: res.data.data });
      })
      .catch(err => {
        console.log("err::", err);
      });
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
    return (
      <div>
        {this.state.sub_category.map((sub_category, key) => {
          return (
              <Link to={`/sub-category/${sub_category._id}`}>
                {sub_category.sub_category_name}
              </Link>
          );
        })}
      </div>
    );
  }
}
export default SubCategoryList;
