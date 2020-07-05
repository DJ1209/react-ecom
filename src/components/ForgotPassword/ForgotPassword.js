import React, { useState } from "react";
import { FormGroup, Label, Button, Input } from "reactstrap";

import "./ForgotPassword.css";
import {
  toastSuccess,
  toastError
} from "../../common_components/ToastContainer/ToastContainer";
import { forgotPassword } from "../../api/api";

export const ForgotPassword = props => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onChange = (name, value) => {
    if (name === "email") setEmail(value);

    if (name === "newPassword") setNewPassword(value);
  };

  const change_password = () => {
    const { history } = props;
    const data = {
      user_email: email
    };
    forgotPassword(data)
      .then(() => {
        toastSuccess("Password sent on email successfully!");
        history.push("/login");
      })
      .catch(() => {
        toastError("Error");
      });
  };
  return (
    <div className="Logincard">
      <br/>
      <br/>
      <center><h1>Forgot Password</h1></center>
    <div className="form">
      <FormGroup>
        <Label>Email:</Label>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => onChange(e.target.name, e.target.value)}
        />
      </FormGroup>
      
      <Button color="primary" onClick={() => change_password()}>
        Recover Password
      </Button>
      <br/><br/><br/>
    </div>
    </div>
  );
};
