import React, { Component } from "react";
import { Navbar, Nav } from "reactstrap";
import { NavLink as Link, withRouter } from "react-router-dom";
import MainCategory from "../Listing/MainCategoryList";

import "../../app.css";
import "./Header.css";
import SubCategoryList from "../Listing/SubCategoryList";

const header = [
  { to: "/home", name: "Home" },
  { to: "/about-us", name: "About Us" },
  { to: "/display-product-list", name: "Products" },
 // { to: "/display-subCategory-list", name: "Sub Category List" }
];
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }

  
  logout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_mobile");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_address");
    localStorage.removeItem("user_gender");
    localStorage.removeItem("area_id");
    //toastSuccess("Logged out successfully!");
    this.props.history.push("/home");
  };
  render() {
    const token = localStorage.getItem("user_id");
    const name = localStorage.getItem("user_name");

    return (
      <div className="header">
        <a href="#default" class="logo">My Shop</a>
        <Navbar color="faded" light>
          <Nav>
            {header.map((navItem, key) => {
              return (
                <div className="link" key={key}>
                  <Link to={navItem.to}>{navItem.name}</Link>
                </div>
              );
            })}
            
              <SubCategoryList />
            <div>
             
              
            </div>

            {token ? (
              <div className="account">
                 
                <Link to={`/user-profile/${localStorage.getItem("user_name")}`}>
                  Hi, {name}
                </Link>
                <Link to={`/view-cart/${localStorage.getItem("user_name")}`}>
                  Cart
                </Link>
                <Link to={`/view-order/${localStorage.getItem("user_name")}`}>
                  View Order
                </Link>
                <Link to={`/change-password`}>
                  Change Password
                </Link>
                <a href='#' onClick={() => this.logout()}>Logout</a>
              </div>
            ) : (
              <div className="account">
                <Link to="/login">Login</Link>
              </div>
            )}
          </Nav>
        </Navbar>
      </div>
    );
  }
}
export default withRouter(Header);
