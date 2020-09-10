import React, { Component } from "react";
import Quizes from "./quizes";
import { getCurrentUser } from "../services/authService";
import { getQuizesByCreater } from "../services/quizService";

class UserDashBoard extends Component {
  state = {
    quizes: this.props.quizes,
  };

  async componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
    if (user) {
      const response = await getQuizesByCreater(user._id);
      const quizes = response.data;

      this.setState({ quizes });
    }
  }

  render() {
    const { user, quizes } = this.props;
    return <Quizes user={user} quizes={quizes} />;
  }
}

export default UserDashBoard;
