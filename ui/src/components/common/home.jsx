import React, { Component } from "react";

class Home extends Component {
  state = {};

  handleCreateQuiz = () => {
    this.props.history.push("/quiz-setup");
  };

  handleJoinQuiz = () => {
    console.log("clicked");
  };

  render() {
    return (
      <div>
        <button onClick={this.handleCreateQuiz} className="btn btn-primary m-2">
          {" "}
          CREATE A QUIZ{" "}
        </button>

        <button onClick={this.handleJoinQuiz} className="btn btn-primary m-2">
          {" "}
          JOIN A QUIZ{" "}
        </button>
      </div>
    );
  }
}

export default Home;
