import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class QuizForm extends Form {
  state = {
    data: {
      name: "",
      quiz_password: "",
      no_of_participants: "",
    },
    questions: [],
  };

  schema = {
    name: Joi.string().required().label("Name"),
    quiz_password: Joi.string().min(5).label("Password"),
    no_of_participants: Joi.number().required().label("No of Participants"),
  };

  async componentDidMount() {}

  handleSubmit = () => {
    this.props.onNext(this.state.data);
    this.props.history.push("/quiz-round");
  };

  render() {
    return (
      <div>
        <h1>Quiz Setup</h1>
        {this.renderInput("name", "Quiz name")}
        {this.renderInput("quiz_password", "Quiz password")}
        {this.renderInput("no_of_participants", "No. of participants")}
        {this.renderButton("Next", this.handleSubmit)}
      </div>
    );
  }
}

export default QuizForm;
