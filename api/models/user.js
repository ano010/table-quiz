const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  is_admin: {
    type: Boolean,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      is_admin: this.is_admin,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
    is_admin: Joi.boolean().required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
