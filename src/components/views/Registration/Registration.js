import React, { useState } from "react";
import styles from "./Registration.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
import settings from "../../../data/settings.js";
import PropTypes from "prop-types";

const Registration = ({ className }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangeRepeatPassword = (event) =>
    setRepeatPassword(event.target.value);

  const submitForm = (event) => {
    event.preventDefault();
    const payload = {
      username,
      email,
      password,
    };

    const url = settings.backend.url + "/" + settings.backend.endpoint.users;

    const fetchOptions = {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    if (
      username != "" &&
      email != "" &&
      password != "" &&
      repeatPassword != ""
    ) {
      if (password === repeatPassword) {
        fetch(url, fetchOptions)
          .then(function (response) {
            return response.json();
          })
          .then(function (parsedResponse) {
            console.log("parsedResponse", parsedResponse);
            alert(parsedResponse.message);
            window.location.replace("/");
          });
      } else {
        alert("Your password is not equal to repeated password");
      }
    } else {
      alert("Please fill in required fields: username, email, password");
    }
  };

  return (
    <div className={clsx(className, styles.root)}>
      <h2>Please register</h2>
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
          <p>E-mail</p>
          <input
            type="email"
            name="email"
            required
            onChange={(event) => handleChangeEmail(event)}
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
        <label>
          <p>Repeat password</p>
          <input
            type="password"
            name="repeatPassword"
            required
            onChange={(event) => handleChangeRepeatPassword(event)}
          />
        </label>
        <div>
          <button className={styles.btn} type="submit">
            Submit
          </button>
        </div>
      </form>
      <Link to="/">
        <button className={styles.btn}>Login</button>
      </Link>
    </div>
  );
};
Registration.propTypes = {
  className: PropTypes.string,
};

export default Registration;
