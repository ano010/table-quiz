import React from "react";
import Form from "./common/form";
import auth from "../services/authService";
import Joi from "joi-browser";

class QuestionForm extends Form {
  state = {
    data: {
      type: "",
      question: "",
      answer: "",
      time_limit: "",
    },
    questions: [],
    isPublished: false,
  };

  schema = {
    type: Joi.string().required().label("Type"),
    question: Joi.string().required().label("Password"),
    answer: Joi.string().required().label("Answer"),
    time_limit: Joi.number().required().label("Time Limit"),
  };

  async componentDidMount() {}

  handleAdd = () => {
    this.props.onAdd(this.state.data);
    this.setState({
      data: { type: "", question: "", answer: "", time_limit: "" },
    });
  };

  handlePublish = () => {
    if (auth.getCurrentUser()) {
      console.log(auth.getCurrentUser());
      this.props.onPublish();
      this.setState({ isPublished: true });
      console.log("Quiz Published");
      this.props.history.push("/user-dashboard");
    } else {
      this.props.history.push("/log-in");
    }
  };

  render() {
    return (
      <div>
        <h1>Question {this.props.quiz.questions.length + 1} </h1>
        {this.renderInput("type", "Type")}
        {this.renderInput("question", "Question")}
        {this.renderInput("answer", "Answer")}
        {this.renderInput("time_limit", "Time Limit")}
        {this.renderButton("Add Question", this.handleAdd)}
        <button className="btn btn-primary m-2" onClick={this.handlePublish}>
          Publish Quiz
        </button>
      </div>
    );
  }
}

export default QuestionForm;
