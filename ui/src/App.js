import React, { Component } from "react";
import { publish } from "./services/quizService";
import NavBar from "./components/navBar";
import { getCurrentUser } from "./services/authService";
import { getQuizesByCreater } from "./services/quizService";
import Routes from "./components/routes/routes";

class App extends Component {
  state = {
    quiz: {
      name: "",
      password: "",
      no_of_participants: 0,
      rounds: [],
    },
    user: {
      name: "",
      email: "",
    },
    to_publish: false,
    quizes: [],
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

  handleLoginOrSignup = async () => {
    const user = getCurrentUser();
    this.setState({ user });

    this.getUpdatedQuizes();
  };

  getUpdatedQuizes = async () => {
    if (this.state.to_publish) {
      const quiz = { ...this.state.quiz };
      quiz.creater_id = this.state.user._id;
      await publish(quiz);
      this.setState({ to_publish: false });
    }
    const response = await getQuizesByCreater(getCurrentUser()._id);
    const quizes = response.data;
    this.setState({ quizes });
  };

  handlePublish = async ({ authenticated, name, questions }) => {
    const round = {};
    round.name = name;
    round.questions = questions;
    const rounds = [...this.state.quiz.rounds];
    rounds.push(round);

    const quiz = { ...this.state.quiz };
    quiz.rounds = rounds;
    if (!authenticated) {
      this.setState({ to_publish: true, quiz });
    } else {
      quiz.creater_id = getCurrentUser()._id;
      await publish(quiz);
      const response = await getQuizesByCreater(getCurrentUser()._id);
      const quizes = response.data;
      this.setState({ quizes });
    }
  };

  handleNext = (state) => {
    const quiz = { ...this.state.quiz };
    quiz.name = state.name;
    quiz.password = state.quiz_password;
    quiz.no_of_participants = state.no_of_participants;

    this.setState({ quiz });
  };

  handleNextRound = (round) => {
    const rounds = [...this.state.quiz.rounds];
    rounds.push(round);

    const quiz = { ...this.state.quiz };
    quiz.rounds = rounds;

    this.setState({
      quiz,
    });
  };

  render() {
    const { quiz, user, quizes, to_publish } = this.state;
    const round_number = this.state.quiz.rounds.length + 1;

    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <main className="conatainer">
          <Routes
            round_number={round_number}
            quiz={quiz}
            user={user}
            quizes={quizes}
            to_publish={to_publish}
            onNext={this.handleNext}
            onLoginOrSignup={this.handleLoginOrSignup}
            onPublish={this.handlePublish}
            onNextRound={this.handleNextRound}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
