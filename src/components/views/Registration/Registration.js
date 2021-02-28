import React from 'react';
import styles from './Registration.module.scss';
import clsx from 'clsx';
import settings from '../../../data/settings.js';

class Registration extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  };
  handleChangeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }
  handleChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  handleChangeRepeatPassword(event) {
    this.setState({
      repeatPassword: event.target.value,
    });
  }
  submitForm(event) {
    const { username, email, password, repeatPassword } = this.state;
    event.preventDefault();
    const payload = {
      username,
      email,
      password,
    };

    const url = settings.backend.url + '/' + settings.backend.endpoint.users;

    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    if (username != '' && email != '' && password != '' && repeatPassword != '') {
      if (password === repeatPassword){
        fetch(url, fetchOptions)
          .then(function (response) {
            return response.json();
          })
          .then(function (parsedResponse) {
            console.log('parsedResponse', parsedResponse);
          });
      } else {
        alert('Your password is not equal to repeated password');
      }
    } else {
      alert('Please fill in required fields: username, email, password');
    }
  }

  render() {
    const className = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <h2>Please register</h2>
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
            <p>E-mail</p>
            <input
              type="email"
              name="email"
              required
              onChange={(event) => this.handleChangeEmail(event)}
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
          <label>
            <p>Repeat password</p>
            <input
              type="password"
              name="repeatPassword"
              required
              onChange={(event) => this.handleChangeRepeatPassword(event)}
            />
          </label>
          <div>
            <button className={styles.btn} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Registration;
