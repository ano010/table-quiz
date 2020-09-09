import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { publish } from "./services/quizService";
import QuizForm from "./components/quizForm";
import QuestionForm from "./components/questionForm";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import Home from "./components/common/home";
import UserDashBoard from "./components/user-dashboard";
import NavBar from "./components/navBar";
import { getCurrentUser } from "./services/authService";
import Logout from "./components/logout";
import Profile from "./components/profile";
import AdminDashboard from "./components/admin-dashboard";

class App extends Component {
  state = {
    quiz: {
      name: "",
      password: "",
      no_of_participants: 0,
      questions: [],
    },
    user: {
      name: "",
      email: "",
    },
  };

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  handleLogin = () => {
    const current_user = getCurrentUser();
    const user = {};
    if (current_user) {
      user.name = current_user.name;
      user.email = current_user.email;
      user._id = current_user._id;
      user.is_admin = current_user.is_admin;
      this.setState({ user });
    }
  };

  handleSignUp = () => {
    const current_user = getCurrentUser();
    const user = {};
    if (current_user) {
      user.name = current_user.name;
      user.email = current_user.email;
      user._id = current_user._id;
      this.setState({ user });
    }
  };

  handlePublish = async () => {
    const quiz = { ...this.state.quiz };
    quiz.creater_id = this.state.user._id;
    this.setState({ quiz });
    try {
      await publish(quiz);
    } catch (ex) {
      console.log(ex.response.data);
    }
  };

  handleNext = (state) => {
    const quiz = { ...this.state.quiz };
    quiz.name = state.name;
    quiz.password = state.quiz_password;
    quiz.no_of_participants = state.no_of_participants;

    this.setState({ quiz });
  };

  handleAdd = (question) => {
    const questions = [...this.state.quiz.questions];
    questions.push(question);

    const quiz = { ...this.state.quiz };
    quiz.questions = questions;

    this.setState({
      quiz,
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <main className="conatainer">
          <Switch>
            <Route
              path="/home"
              render={(props) => <Home {...props} onNext={this.handleNext} />}
            />
            <Route
              path="/quiz-setup"
              render={(props) => (
                <QuizForm {...props} onNext={this.handleNext} />
              )}
            />
            <Route
              path="/questions"
              render={(props) => (
                <QuestionForm
                  {...props}
                  quiz={this.state.quiz}
                  onAdd={this.handleAdd}
                  onPublish={this.handlePublish}
                />
              )}
            />
            <Route
              path="/log-in"
              render={(props) => (
                <LoginForm
                  {...props}
                  quiz={this.state.quiz}
                  onLogin={this.handleLogin}
                  onPublish={this.handlePublish}
                />
              )}
            />
            <Route
              path="/sign-up"
              render={(props) => (
                <SignupForm
                  {...props}
                  quiz={this.state.quiz}
                  onSignUp={this.handleSignUp}
                  onPublish={this.handlePublish}
                />
              )}
            />
            <Route
              path="/log-out"
              render={(props) => (
                <Logout
                  {...props}
                  quiz={this.state.quiz}
                  onPublish={this.handlePublish}
                />
              )}
            />
            <Route
              path="/profile"
              render={(props) => <Profile user={this.state.user} />}
            />
            <Route
              path="/user-dashboard"
              render={(props) => (
                <UserDashBoard {...props} user={this.state.user} />
              )}
            />
            <Route
              path="/manage"
              render={(props) => (
                <AdminDashboard {...props} user={this.state.user} />
              )}
            />
            <Redirect from="/" exact to="/home" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
