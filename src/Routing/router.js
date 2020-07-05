import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/Header/Header";
import SubCategoryDetails from "../components/SubCategory/SubCategoryDetails";
import Product from "../components/Product/Product";
import ProductDetails from "../components/Product/ProductDetails";
import Login from "../components/Login/Login";
import ProductList from "../components/Listing/ProductList";
import SubCategoryList from "../components/Listing/SubCategoryList";
import UserProfile from "../components/UserProfile/UserProfile";
import EditProfile from "../components/EditProfile/EditProfile";
import SignUp from "../components/SignUp/SignUp";
import { AboutUs } from "../components/AboutUs/AboutUs";
import { Home } from "../components/Home/Home";
import { ChangePassword } from "../components/ChangePassword/ChangePassword";
import { ForgotPassword } from "../components/ForgotPassword/ForgotPassword";
import ViewCart from "../components/ViewCart/ViewCart";

import viewOrder from "../components/ViewOrder/ViewOrder";

import { ConfirmOrder } from "../components/ConfirmOrder/ConfirmOrder";
//import { viewOrder } from "../api/api";
export const routing = (
  <Router>
    <Header />
    <ToastContainer hideProgressBar />
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/about-us" component={AboutUs} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/category/:id" component={SubCategoryDetails} />
      <Route exact path="/display-product-list" component={ProductList} />
      <Route
        exact
        path="/display-subCategory-list"
        component={SubCategoryList}
      />
      <Route exact path="/sub-category/:id" component={Product} />
      <Route exact path="/product-details/:id" component={ProductDetails} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/user-profile/:id" component={UserProfile} />
      <Route exact path="/edit-profile/:id" component={EditProfile} />
      <Route exact path="/change-password" component={ChangePassword} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/view-cart/:id" component={ViewCart} />
      <Route exact path="/view-order/:id" component={viewOrder} />
      <Route exact path="/confirm-order/" component={ConfirmOrder} />
    </Switch>
  </Router>
);
