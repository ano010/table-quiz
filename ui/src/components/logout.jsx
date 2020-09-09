import { Component } from "react";
import { logout, getCurrentUser } from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    logout();

    window.location = "/";

    console.log(getCurrentUser());
  }

  render() {
    return null;
  }
}

export default Logout;
