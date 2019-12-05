import React from 'react';

import Auth from './components/auth/auth.js';
import Login from './components/auth/login.js';
import LoginContext from './components/auth/context.js';
import Nav from './components/nav';

const EditLink = props => {
  return (
    <Auth capability="update">
      <span>Edit</span>
    </Auth>
  );
};

const DeleteLink = props => {
  return (
    <Auth capability="delete">
      <span>Delete</span>
    </Auth>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LoginContext>
        <Nav />
        <Login />
        <hr />
        <EditLink />
        <DeleteLink />
      </LoginContext>
    );
  }
}

export default App;
