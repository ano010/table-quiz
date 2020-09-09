import React from "react";
import { Link, NavLink } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        TableQuiz.app
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {user && user.is_admin && (
            <NavLink className="nav-item nav-link" to="/manage">
              Manage
            </NavLink>
          )}
          {getCurrentUser() && (
            <NavLink className="nav-item nav-link" to="/user-dashboard">
              Dashboard
            </NavLink>
          )}
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/log-in">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/sign-up">
                Signup
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/log-out">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
