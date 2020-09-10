import React from "react";
import Form from "./common/form";
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

  render() {
    return (
      <div>
        <h5 className="text-center">Question {this.props.q_number} </h5>
        {this.renderInput("type", "Type")}
        {this.renderInput("question", "Question")}
        {this.renderInput("answer", "Answer")}
        {this.renderInput("time_limit", "Time Limit")}
        {this.renderButton("ADD QUESTION", this.handleAdd)}
      </div>
    );
  }
}

export default QuestionForm;
