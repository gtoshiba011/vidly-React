import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  // use Ref to bind input and state
  // username = React.createRef();

  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  // componentDidMount() {
  //   // focus on username input after mount
  //   this.username.current.focus();
  // }
  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "") {
      errors.username = "Username is required.";
    }
    if (account.password.trim() === "") {
      errors.password = "Password is required.";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    if (name === "username" && value.trim() === "")
      return "Username is required.";
    if (name === "password" && value.trim() === "")
      return "Password is required.";
  };

  handleSubmit = event => {
    event.preventDefault();

    // do not use document in React
    // const username = document.getElementById('username').value;

    // use reference in React
    // const username = this.username.current.value;

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // call the server
    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    // update accout dynamically -> use bracket notation
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {/* <form> */}
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
