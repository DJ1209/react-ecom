import React, { useState } from "react";
import { FormGroup, Label, Button, Input } from "reactstrap";

import "./ChangePassword.css";
import {
  toastSuccess,
  toastError
} from "../../common_components/ToastContainer/ToastContainer";
import { changePassword } from "../../api/api";

export const ChangePassword = props => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onChange = (name, value) => {
    if (name === "oldPassword") setOldPassword(value);
    if (name === "newPassword") setNewPassword(value);
  };

  const change_password = () => {
    const { history } = props;
    const data = {
      user_id: localStorage.getItem("user_id"),
      user_new_password: newPassword
    };
    changePassword(data)
      .then(() => {
        toastSuccess("Password changed successfully!");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_mobile");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_address");
        localStorage.removeItem("user_gender");
        localStorage.removeItem("area_id");
        history.push("/login");
      })
      .catch(() => {
        toastError("Error");
      });
  };
  return (
    <div className="form">
      <FormGroup>
        <Label>Old Password:</Label>
        <Input
          type="password"
          name="oldPassword"
          value={oldPassword}
          placeholder="Old Password"
          onChange={e => onChange(e.target.name, e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>New Password:</Label>
        <Input
          type="password"
          name="newPassword"
          value={newPassword}
          placeholder="New Password"
          onChange={e => onChange(e.target.name, e.target.value)}
        />
      </FormGroup>
      <Button color="primary" onClick={() => change_password()}>
        Change Password
      </Button>
    </div>
  );
};
