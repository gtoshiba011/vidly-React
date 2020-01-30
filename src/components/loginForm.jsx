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

  handleSubmit = event => {
    event.preventDefault();

    // do not use document in React
    // const username = document.getElementById('username').value;

    // use reference in React
    // const username = this.username.current.value;

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors });
    if (errors) return;

    console.log("handleSubmit");
  };

  handleChange = event => {
    const account = { ...this.state.account };

    // update accout dynamically -> use bracket notation
    account[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
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
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
