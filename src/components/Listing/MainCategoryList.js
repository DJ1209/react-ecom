import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { NavLink as Link } from "react-router-dom";
import { getMainCategoryList } from "../../api/api";

class MainCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      main_category: []
    };
  }
  componentDidMount() {
    this.getMainCategoryList();
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  getMainCategoryList() {
    getMainCategoryList()
      .then(res => {
        this.setState({ main_category: res.data.data });
      })
      .catch(err => {
        console.log("Error while fetching Main Category List", err);
      });
  }
  render() {
    const { main_category } = this.state;
    return (
      <div>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret id="category" onClick={() => this.toggle()}>
             Category
          </DropdownToggle>
          <DropdownMenu>
            {main_category.map((category, key) => {
              return (
                <DropdownItem key={key}>
                  <Link to={`/category/${category._id}`}>
                    {category.category_name}
                  </Link>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}
export default MainCategory;
