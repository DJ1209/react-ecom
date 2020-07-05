import React, { Component } from "react";
import { Form, FormGroup, Button, Label } from "reactstrap";
import { get } from "lodash";
import Select from "react-select";

import {
  toastSuccess,
  toastError
} from "../../common_components/ToastContainer/ToastContainer";
import "./SignUp.css";
import { submitSignUpData } from "../../api/api";
import CommonInput from "../../common_components/Input/Input";

const options = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" }
];

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        user_name: "",
        user_email: "",
        user_password: "",
        user_mobile: "",
        user_address: "",
        area_id: "1233",
        user_gender: null
      },
      flag: false
    };
  }

  onChange(e, inputType) {
    const { user } = this.state;
    let obj = {};
    if (inputType !== "select") {
      obj[e.target.id] = e.target.value;
      this.setState({ user: { ...user, ...obj } });
    } else {
      this.setState({ user: { ...user, user_gender: e } });
    }
  }

  submitSignUpData() {
    const { user } = this.state;
    submitSignUpData({ ...user, user_gender: user.user_gender.label })
      .then(() => {
        toastSuccess("Signed Up successfully!");
        this.setState({ flag: true });
        
      })
      .catch(err => {
        toastError(get(err, "message") || "Oops! Something went wrong");
      });
  }

  render() {
    const { user, flag } = this.state;
    return (

      <div className="Logincard">
      <div className="form">
      <br/> <br/>
       <center> <h1 >Registration</h1></center>

        <span className="message-for-login">
          {flag
            ? "You have signed up successfully. Please log in to access your account."
            : ""}
        </span>

        <Form>
          <FormGroup>
            <CommonInput
              type="text"
              label="Name"
              id="user_name"
              value={user.user_name}
              placeholder="Enter Name"
              onChange={e => this.onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <CommonInput
              type="text"
              label="Email"
              id="user_email"
              value={user.user_email}
              placeholder="Enter Email"
              onChange={e => this.onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <CommonInput
              type="password"
              label="Password"
              id="user_password"
              value={user.user_password}
              placeholder="Enter Password"
              onChange={e => this.onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Gender</Label>
            <Select
              value={user.user_gender}
              onChange={option => this.onChange(option, "select")}
              options={options}
            />
          </FormGroup>
          <FormGroup>
            <CommonInput
              type="textarea"
              label="Address"
              id="user_address"
              value={user.user_address}
              placeholder="Enter Address"
              onChange={e => this.onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <CommonInput
              type="number"
              label="Mobile no."
              id="user_mobile"
              value={user.user_mobile}
              placeholder="Enter Mobile Number"
              onChange={e => this.onChange(e)}
            />
          </FormGroup>

          <Button color="primary" onClick={() => this.submitSignUpData()}>
            Sign Up
          </Button>
        </Form>
        <br/><br/><br/>
      </div>
      </div>
    );
  }
}
export default SignUp;
