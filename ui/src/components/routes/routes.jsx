import React, { Component } from "react";
import QuizForm from "../quizForm";
import LoginForm from "../auth/loginForm";
import SignupForm from "../auth/signupForm";
import Home from "../home";
import UserDashBoard from "../user-dashboard";
import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "../auth/logout";
import Profile from "../profile";
import AdminDashboard from "../admin-dashboard";
import QuizRound from "../quizRound";
import ProtectedRoute from "./protectedRoute";
import { getCurrentUser } from "../../services/authService";

class Routes extends Component {
  state = {};

  handleNextRound = (round) => {
    this.props.onNextRound(round);
  };
  render() {
    const {
      user,
      quizes,
      onNext,
      onLoginOrSignup,
      onPublish,
      round_number,
    } = this.props;
    return (
      <Switch>
        <Route path="/home" render={(props) => <Home {...props} />} />
        <Route
          path="/quiz-setup"
          render={(props) => <QuizForm {...props} onNext={onNext} />}
        />
        <Route
          path="/quiz-round"
          render={(props) => (
            <QuizRound
              {...props}
              round_number={round_number}
              onNextRound={this.handleNextRound}
              onPublish={onPublish}
            />
          )}
        />
        <Route
          path="/log-in"
          render={(props) => <LoginForm {...props} onLogin={onLoginOrSignup} />}
        />
        <Route
          path="/sign-up"
          render={(props) => (
            <SignupForm {...props} onSignUp={onLoginOrSignup} />
          )}
        />
        <Route path="/log-out" render={(props) => <Logout {...props} />} />
        <Route
          path="/profile"
          render={(props) => <Profile {...props} user={user} />}
        />
        <Route
          path="/user-dashboard"
          render={(props) => (
            <UserDashBoard {...props} quizes={quizes} user={user} />
          )}
        />
        <ProtectedRoute
          condition={getCurrentUser() && getCurrentUser().is_admin}
          path="/"
          component={AdminDashboard}
        />
        <Redirect from="/" exact to="/home" />
      </Switch>
    );
  }
}

export default Routes;
