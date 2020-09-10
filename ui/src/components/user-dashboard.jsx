import React, { Component } from "react";
import Quizes from "./quizes";
import { getCurrentUser } from "../services/authService";
import { Redirect } from "react-router-dom";

class UserDashBoard extends Component {
  state = {
    quizes: this.props.quizes,
  };

  render() {
    const { user, quizes } = this.props;
    if (!getCurrentUser()) return <Redirect to="/home" />;
    return <Quizes user={user} quizes={quizes} />;
  }
}

export default UserDashBoard;
