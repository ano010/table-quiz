import React, { Component } from "react";

class Quizes extends Component {
  state = {};
  render() {
    const quizes = this.props.quizes;
    let count = 1;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">No. of participants</th>
          </tr>
        </thead>
        <tbody>
          {quizes.map((quiz) => (
            <tr key={count}>
              <th scope="row">{count++}</th>
              <td>{quiz.name}</td>
              <td>{quiz.no_of_participants}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Quizes;
