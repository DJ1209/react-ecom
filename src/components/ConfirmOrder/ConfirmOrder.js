import React, { useState } from "react";
import { FormGroup, Label, Button, Input } from "reactstrap";

import "./ChangePassword.css";
import {
  toastSuccess,
  toastError
} from "../../common_components/ToastContainer/ToastContainer";
import { confirmOrder } from "../../api/api";

export const ConfirmOrder = props => {

  const confirm_order = () => {
    const { history } = props;
    const data = {
      user_id: localStorage.getItem("user_id")
    };
    confirmOrder(data)
      .then(() => {
        toastSuccess("Order Placed successfully!");
        history.push("/home");
      })
      .catch(() => {
        toastError("Error");
      });
  };
  return (
    <div className="form">
      <center>
      <h1>Are you sure you want to place order ? </h1>
      <Button color="primary" onClick={() => confirm_order()}>
        Yes Confirm Order
      </Button>
      </center>
    </div>
  );
};
