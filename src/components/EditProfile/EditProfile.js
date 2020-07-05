import React, { Component } from "react";
import { Form, FormGroup, Button, Label } from "reactstrap";
import { get, find } from "lodash";
import Select from "react-select";

import {
  toastSuccess,
  toastError
} from "../../common_components/ToastContainer/ToastContainer";
import "./EditProfile.css";
import { getUserProfile, editProfile } from "../../api/api";
import CommonInput from "../../common_components/Input/Input";

const options = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" }
];

class EditProfile extends Component {
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
      }
    };
  }
  componentDidMount() {
    const id = localStorage.getItem("user_id");
    this.getUserProfile(id);
  }

  getUserProfile(id) {
    getUserProfile(id).then(response => {
      const data = get(response, "data.data[0]");
      this.setState({
        user: {
          user_name: get(data, "user_name"),
          user_email: get(data, "user_email"),
          user_password: get(data, "user_password"),
          user_mobile: get(data, "user_mobile"),
          user_address: get(data, "user_address"),
          area_id: "1233",
          user_gender: get(data, "user_gender")
        }
      });
    });
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

  editProfile() {
    const { user } = this.state;
    const { history } = this.props;
    const id = localStorage.getItem("user_id");

    editProfile({ ...user, user_id: id, user_gender: user.user_gender.label })
      .then(response => {
        toastSuccess("Edited successfully!");
        this.props.history.push(`/user-profile/${id}`);
      })
      .catch(() => {
        toastError("Oops! Something went wrong");
        history.push("/login");
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="form">
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
              value={
                user.user_gender &&
                options.find(i => i.label === this.state.user.user_gender)
              }
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

          <Button color="primary" onClick={() => this.editProfile()}>
            Edit
          </Button>
        </Form>
      </div>
    );
  }
}
export default EditProfile;
