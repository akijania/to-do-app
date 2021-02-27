import React from 'react';
import styles from './Registration.module.scss';
import clsx from 'clsx';

const Registration = (className) => {
  return (
    <div className={clsx(className, styles.root)}>
      <h2>Please register</h2>
      <form method="POST">
        <label>
          <p>Username</p>
          <input type="text" name="username" required />
        </label>
        <label>
          <p>E-mail</p>
          <input type="email" name="email" required />
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" required />
        </label>
        <div>
          <button className={styles.btn} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
