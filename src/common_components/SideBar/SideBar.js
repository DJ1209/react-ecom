import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

export const SideBar = props => {
  const id = localStorage.getItem("user_id");
  return (
    <div className="side-bar">
      <div className="left">
        <li className="list">
          <NavLink to={`/edit-profile/${id}`}>Edit Profile</NavLink>
        </li>
        <li className="list">
          <NavLink to="/change-password">Change Password</NavLink>
        </li>
        <li className="list">
          <NavLink to={`/view-cart/${id}`}>View Cart</NavLink>
        </li>
      </div>
    </div>
  );
};
