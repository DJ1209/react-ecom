import React, { Component } from "react";
import { Button } from "reactstrap";
import { get } from "lodash";
import { getUserProfile } from "../../api/api";
import { SideBar } from "../../common_components/SideBar/SideBar";

import {
  toastSuccess,
  toastError
} from "../../common_components/ToastContainer/ToastContainer";
import "../../common_components/SideBar/SideBar.css";
import "./UserProfile.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    const id = localStorage.getItem("user_id");
    getUserProfile(id)
      .then(res => {
        const user = res.data.data[0];
        this.setState({ user });
      })
      .catch(err => {
        toastError(get(err, "message") || "Oops! Something went wrong");
        this.props.history.push("/login");
      });
  }

  logout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_mobile");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_address");
    localStorage.removeItem("user_gender");
    localStorage.removeItem("area_id");
    toastSuccess("Logged out successfully!");
    this.props.history.push("/home");
  };
  render() {
    const token = localStorage.getItem("user_id");
    const { user } = this.state;
    return (
      <div>
        {token ? (
          <>
            <div className="dashboard">
              <SideBar />
              <div className="user-details">
                <span className="user-heading">
                  Hi {get(user, "user_name")}{" "}
                </span>
                <ul>
                  <li>Name : </li>
                  <div className="user-content">{get(user, "user_name")}</div>

                  <li>Email : </li>
                  <div className="user-content">{get(user, "user_email")}</div>

                  <li>Gender : </li>
                  <div className="user-content">{get(user, "user_gender")}</div>

                  <li>Address : </li>
                  <div className="user-content">
                    {get(user, "user_address")}
                  </div>

                  <li>Mobile no : </li>
                  <div className="user-content">{get(user, "user_mobile")}</div>
                </ul>
              </div>
            </div>

            <Button onClick={() => this.logout()}>Logout</Button>
          </>
        ) : (
          <h1>Please log in again</h1>
        )}
      </div>
    );
  }
}
export default UserProfile;
