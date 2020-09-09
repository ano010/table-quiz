import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label, handleSubmit) {
    return (
      <button
        disabled={this.validate()}
        onClick={handleSubmit}
        className="btn btn-primary m-2"
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const data = this.state.data;
    const errors = { ...this.state.errors };
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        error={errors[name]}
        label={label}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
