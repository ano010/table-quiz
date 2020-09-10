const mongoose = require("mongoose");
const Joi = require("joi");

const Quiz = mongoose.model(
  "Quiz",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    password: {
      type: String,
    },
    no_of_participants: {
      type: Number,
    },
    rounds: {
      type: Array,
      default: [],
    },
    creater_id: {
      type: String,
      required: true,
    },
  })
);

function validateQuiz(quiz) {
  const schema = Joi.object({
    name: Joi.string().required().max(50),
    password: Joi.string(),
    no_of_participants: Joi.number(),
    rounds: Joi.array(),
    creater_id: Joi.string().required(),
  });

  return schema.validate(quiz);
}

exports.Quiz = Quiz;
exports.validate = validateQuiz;
