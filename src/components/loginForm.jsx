import React, { Component } from "react";

class LoginForm extends Component {
  // use Ref to bind input and state
  username = React.createRef();

  state = {
    account: { username: "", password: "" }
  };

  componentDidMount() {
    // focus on username input after mount
    // this.username.current.focus();
  }

  handleSubmit = event => {
    event.preventDefault();

    // do not use document in React
    // const username = document.getElementById('username').value;

    // use reference in React
    const username = this.username.current.value;
    console.log("handleSubmit", username);
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
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              autoFocus
              value={account.username}
              name="username"
              // ref={this.username}
              id="username"
              type="text"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              name="password"
              id="password"
              type="text"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
