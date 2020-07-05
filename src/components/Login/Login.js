import React, { Component } from "react";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";
import { NavLink as Link } from "react-router-dom";
import { get } from "lodash";

import {
  toastSuccess,
  toastError
} from "../../common_components/ToastContainer/ToastContainer";
import { submitLoginData } from "../../api/api";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        user_email: "",
        user_password: ""
      }
    };
  }

  getLoginData(e) {
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState({ user: { ...this.state.user, ...obj } });
  }
  

  login = () => {
    const { user } = this.state;
    const { history } = this.props;
    submitLoginData(user)
      .then(res => {
        const mydata = res.data.data[0];
        console.log(mydata);
        localStorage.setItem("user_id", mydata._id);
        localStorage.setItem("user_name", mydata.user_name);
       
        toastSuccess("User Logged In.");
        history.push(`/user-profile/${get(mydata, "user_id")}`);
      })
      .catch(err => {
        toastError("Oops! Something went wrong"+ err);
        this.props.history.push("/login");
      });
  };
  logout = () => {
    localStorage.removeItem("user_id");
    this.props.history.push("/login");
  };

  render() {
    const data = localStorage.getItem("user_id");
    return (
      <>
        {data ? (
          <>
            <h1>Seems like you are already logged in.</h1>
            <Button onClick={() => this.logout()}>Logout</Button>
          </>
        ) : (
          <div className="row">
          <br/> <br/>
          <div className="col col-lg-12">
          <div className="Logincard">

          <div className="form">
            <center><h1 >Login</h1></center>
            <Form>
              <FormGroup>
                <Label>Email:</Label>
                <Input
                  type="text"
                  id="user_email"
                  placeholder="Enter Username"
                  onChange={e => this.getLoginData(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password:</Label>
                <Input
                  type="password"
                  id="user_password"
                  placeholder="Enter Password"
                  onChange={e => this.getLoginData(e)}
                />
              </FormGroup>
              <span className="login-link"></span>
              
              <Button color="primary" onClick={this.login}>
                Click to Login
              </Button>
            </Form>
            <Link to="/sign-up" className="login-link">Don't have an account?</Link>
            <Link to="/forgot-password" className="login-link">Forgot password?</Link>
            <br/><br/><br/>
          </div>
          </div>
          </div>
          </div>
        )}
      </>
    );
  }
}
export default Login;
