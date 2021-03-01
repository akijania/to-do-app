import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';
import clsx from 'clsx';
import settings from '../../../data/settings.js';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };
  handleChangeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }
  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  submitForm(event) {
    const { username, password } = this.state;
    event.preventDefault();
    const payload = {
      username,
      password,
    };

    const url = settings.backend.url + '/' + settings.backend.endpoint.login;

    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    if (username != '' && password != '') {
      fetch(url, fetchOptions)
        .then(function (response) {
          return response.json();
        })
        .then(function (parsedResponse) {
          window.location.replace(`/${parsedResponse.userId[0].id}`);
          localStorage.setItem('token', parsedResponse.userId[0].id);
          alert(parsedResponse.message);
        });
    } else {
      alert('Please fill in required fields: username and password');
    }
  }
  render() {
    const className = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <h2>Please Log In</h2>
        <form method="POST" onSubmit={(event) => this.submitForm(event)}>
          <label>
            <p>Username</p>
            <input
              type="text"
              name="username"
              required
              onChange={(event) => this.handleChangeUsername(event)}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              name="password"
              required
              onChange={(event) => this.handleChangePassword(event)}
            />
          </label>
          <div>
            <button className={styles.btn} type="submit">
              Submit
            </button>
          </div>
        </form>
        <p>
          not registered yet? Please <Link to="/register">Register</Link>
        </p>
      </div>
    );
  }
}

export default Login;
