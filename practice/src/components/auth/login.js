import React from 'react';
import { LoginContext } from './context';
import If from './if';

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.context.doLogin(this.state.username, this.state.password);
  };

  render() {
    return (
      <>
        <If condition={this.context.loggedIn}>
          <h3>Logged In</h3>
          <button onClick={this.context.doLogout}>Logout</button>
        </If>

        <If condition={!this.context.loggedIn}>
          <h3>You are not currently logged in!</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <input type="submit" value="Login" />
          </form>
        </If>
      </>
    );
  }
}

export default Login;
