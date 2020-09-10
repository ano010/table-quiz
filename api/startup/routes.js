const express = require("express");
const quizes = require("../routes/quizes");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/quizes", quizes);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};
