import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

import * as userService from "../services/userService";
import auth from "../services/authService";

class SignupForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).label("Password"),
    name: Joi.string().required().max(50).label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);

      auth.loginWithJwt(response.headers["x-auth-token"]);

      this.props.onSignUp();
      this.setState({ errors: null });
      this.props.history.replace("/user-dashboard");
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>

        {this.renderInput("email", "Email")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("SIGN UP", this.doSubmit)}

        {this.state.errors && (
          <h5 className="text-danger">{this.state.errors.username}</h5>
        )}
      </div>
    );
  }
}

export default SignupForm;
