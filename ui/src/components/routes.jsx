import React, { Component } from "react";
import QuizForm from "./quizForm";
import QuestionForm from "./questionForm";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";
import Home from "./common/home";
import UserDashBoard from "./user-dashboard";
import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "./logout";
import Profile from "./profile";
import AdminDashboard from "./admin-dashboard";

class Routes extends Component {
  state = {};
  render() {
    const {
      quiz,
      user,
      quizes,
      onNext,
      onLoginOrSignup,
      onPublish,
      onAdd,
    } = this.props;
    return (
      <Switch>
        <Route
          path="/home"
          render={(props) => <Home {...props} onNext={onNext} />}
        />
        <Route
          path="/quiz-setup"
          render={(props) => <QuizForm {...props} onNext={onNext} />}
        />
        <Route
          path="/questions"
          render={(props) => (
            <QuestionForm
              {...props}
              quiz={quiz}
              onAdd={onAdd}
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
        <Route path="/profile" render={(props) => <Profile user={user} />} />
        <Route
          path="/user-dashboard"
          render={(props) => (
            <UserDashBoard {...props} quizes={quizes} user={user} />
          )}
        />
        <Route
          path="/manage"
          render={(props) => <AdminDashboard {...props} user={user} />}
        />
        <Redirect from="/" exact to="/home" />
      </Switch>
    );
  }
}

export default Routes;
