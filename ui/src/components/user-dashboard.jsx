import React, { Component } from "react";
import Quizes from "./quizes";
import { getQuizesByCreater } from "../services/quizService";
import { getCurrentUser } from "../services/authService";

class UserDashBoard extends Component {
  state = {
    quizes: [],
  };

  async componentDidMount() {
    const user = getCurrentUser();
    console.log(user);
    const response = await getQuizesByCreater(user._id);
    const quizes = response.data;

    console.log(quizes);

    this.setState({ quizes });
  }

  render() {
    return <Quizes quizes={this.state.quizes} />;
  }
}

export default UserDashBoard;
