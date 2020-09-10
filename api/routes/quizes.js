const { Quiz, validate } = require("../models/quiz");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const quiz = await Quiz.find().sort("name");
  res.send(quiz);
});

router.get("/creater/:id", async (req, res) => {
  const quizes = await Quiz.find({ creater_id: req.params.id });
  res.send(quizes);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let quiz = new Quiz({
    name: req.body.name,
    password: req.body.password,
    no_of_participants: req.body.no_of_participants,
    rounds: req.body.rounds,
    creater_id: req.body.creater_id,
  });

  quiz = await quiz.save();

  res.send(quiz);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const quiz = await Quiz.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      password: req.body.password,
      no_of_participants: req.body.no_of_participants,
      rounds: req.body.rounds,
      creater_id: req.body.creater_id,
    },
    { new: true }
  );

  if (!quiz)
    return res.status(404).send("The quiz with the given ID was not found.");

  res.send(quiz);
});

router.delete("/:id", [auth], async (req, res) => {
  const quiz = await Quiz.findByIdAndRemove(req.params.id);

  if (!quiz)
    return res.status(404).send("The quiz with the given ID was not found");

  res.send(quiz);
});

router.get("/:id", async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz)
    return res.status(404).send("The quiz with the given ID was not found.");

  res.send(quiz);
});

module.exports = router;
