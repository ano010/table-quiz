import React from "react";
import Form from "./common/form";
import auth from "../services/authService";
import Joi from "joi-browser";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).label("Password"),
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await auth.login(username, password);
      this.setState({ errors: null });
      this.props.onLogin();
      this.props.history.replace("/user-dashboard");
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleSignUP = () => {
    this.props.history.push("/sign-up");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>

        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderButton("LOG IN", this.doSubmit)}
        <button className="btn btn-primary m-2" onClick={this.handleSignUP}>
          SIGN UP
        </button>
      </div>
    );
  }
}

export default LoginForm;
