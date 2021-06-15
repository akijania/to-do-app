import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';
import settings from '../../../data/settings.js';
import PropTypes from 'prop-types';

const Login:React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = (event:React.FormEvent<HTMLInputElement>) => setUsername(event.currentTarget.value);
  const handleChangePassword = (event:React.FormEvent<HTMLInputElement>) => setPassword(event.currentTarget.value);

  const submitForm = (event:React.FormEvent) => {
    event.preventDefault();
    const payload = {
      username: username,
      password: password,
    };

    const url = settings.backend.url + '/' + settings.backend.endpoint.login;

    const fetchOptions: RequestInit = {
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
          if (parsedResponse.data) {
            window.location.replace(`/${parsedResponse.data.id}`);
            localStorage.setItem('token', parsedResponse.data.id);
            alert(parsedResponse.message);
          } else {
            alert(
              'Problem with log in. Check if your username and password are correct'
            );
          }
        });
    } else {
      alert('Please fill in required fields: username and password');
    }
  };

  return (
    <div className={styles.root}>
      <h2>Please Log In</h2>
      <form method="POST" onSubmit={(event) => submitForm(event)}>
        <label>
          <p>Username</p>
          <input
            type="text"
            name="username"
            required
            onChange={(event) => handleChangeUsername(event)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            name="password"
            required
            onChange={(event) => handleChangePassword(event)}
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
};
Login.propTypes = {
  className: PropTypes.string,
};

export default Login;
