// import React from 'react';
// import cookie from 'react-cookies';
// import jwt from 'jsonwebtoken';

// const API = process.env.REACT_APP_API;

// const testLogins = {
//   testAdmin: process.env.REACT_APP_ADMIN_TOKEN || '',
//   testEditor: process.env.REACT_APP_EDITOR_TOKEN || '',
//   testUser: process.env.REACT_APP_USER_TOKEN || '',
// };

// export const LoginContext = React.createContext();

// class LoginProvider extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loggedIn: false,
//       login: this.login,
//       logout: this.logout,
//       user: {},
//     };
//   }

//   login = (username, password) => {
//     // This is foul and unsafe ... but when working offline / testmode ess oh kay
//     if (testLogins[username]) {
//       this.validateToken(testLogins[username]);
//     }
//     else {
//       fetch(`${API}/signin`, {
//         method: 'post',
//         mode: 'cors',
//         cache: 'no-cache',
//         headers: new Headers({
//           "Authorization": `Basic ${btoa(`${username}:${password}`)}`
//         })
//       })
//         .then(response => response.text())
//         .then(token => this.validateToken(token))
//         .catch(console.error);
//     }
//   }

//   validateToken = token => {
//     try {
//       let user = jwt.verify(token, process.env.REACT_APP_SECRET)
//       console.log('all good');
//       this.setLoginState(true, token, user);
//     }
//     catch (e) {
//       this.setLoginState(false, null, {});
//       console.log("Token Validation Error", e);
//     }

//   };

//   logout = () => {
//     this.setLoginState(false, null, {});
//   };

//   setLoginState = (loggedIn, token, user) => {
//     cookie.save('auth', token);
//     this.setState({ token, loggedIn, user });
//   };

//   render() {
//     return (
//       <LoginContext.Provider value={this.state}>
//         {this.props.children}
//       </LoginContext.Provider>
//     );
//   }
// }

// export default LoginProvider;

import React from 'react';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

export const LoginContext = React.createContext();

class LoginWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      token: null,
      user: {},
      doLogin: this.doLogin,
      doLogout: this.doLogout
    };
  }

  doLogin = (username, password) => {
    console.log(`logging in as ${username}...`);
    fetch('https://api-js401.herokuapp.com/signin', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
      })
    })
      .then(res => res.text())
      .then(token => this.validateToken(token))
      .catch(console.error);
  };

  doLogout = () => {
    console.log(`logging out...`);
    cookie.save('auth', null);
    this.setState({
      loggedIn: false,
      token: null,
      user: {}
    });
  };

  validateToken = token => {
    try {
      const user = jwt.verify(token, process.env.REACT_APP_SECRET);
      cookie.save('auth', token);
      this.setState({
        loggedIn: true,
        token,
        user
      });
    } catch (e) {
      this.doLogout();
      console.error('Token Validation Error', e);
    }
  };

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginWrapper;
