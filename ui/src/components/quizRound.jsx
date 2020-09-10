import React from "react";
import QuestionForm from "./questionForm";
import Form from "./common/form";
import { getCurrentUser } from "../services/authService";
import Joi from "joi-browser";

class QuizRound extends Form {
  state = {
    data: {
      round_name: "",
    },
    round: {
      name: "",
      questions: [],
    },
  };

  schema = {
    round_name: Joi.string().required().label("Round Name"),
  };

  handleAddQuestionInRound = (question) => {
    const questions = this.state.round.questions;
    questions.push(question);
    const round = { ...this.state.round };
    round.questions = questions;
    this.setState({
      round,
    });
  };

  handleNextRound = () => {
    const name = this.state.data.round_name;
    const questions = this.state.round.questions;

    this.props.onNextRound({
      name,
      questions,
    });

    const data = { ...this.state.data };
    data.round_name = "";

    const round = { ...this.state.round };
    round.name = "";
    round.questions = [];

    this.setState({ data, round });
  };

  handlePublish = () => {
    const name = this.state.data.round_name;
    const questions = this.state.round.questions;

    // this.props.onNextRound({
    //   name,
    //   questions,
    // });

    if (getCurrentUser()) {
      this.props.onPublish({ authenticated: true, name, questions });
      this.props.history.push("/user-dashboard");
    } else {
      this.props.onPublish({ authenticated: false, name, questions });
      this.props.history.push("/log-in");
    }
  };

  render() {
    const q_number = this.state.round.questions.length + 1;
    return (
      <div>
        <h5 className="text-center"> Round {this.props.round_number} Setup</h5>
        {this.renderInput("round_name", "Round Name")}
        {this.renderButton("NEXT ROUND", this.handleNextRound)}
        {this.renderButton("PUBLISH QUIZ", this.handlePublish)}
        <QuestionForm
          q_number={q_number}
          onAdd={this.handleAddQuestionInRound}
        />
      </div>
    );
  }
}

export default QuizRound;
