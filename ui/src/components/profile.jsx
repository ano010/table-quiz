import React, { Component } from "react";

class Profile extends Component {
  render() {
    const { name, email, _id } = this.props.user;
    return (
      <div>
        <h5>Name: {name}</h5>
        <h5>Email: {email}</h5>
        <h5>User ID: {_id}</h5>
      </div>
    );
  }
}

export default Profile;
