import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';
import clsx from 'clsx';

const Login = (className) => {
  return(
    <div className={clsx(className, styles.root)}>
      <h2>Please Log In</h2>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button className={styles.btn} type="submit">Submit</button>
        </div>
      </form>
      <p>not registered yet? Please <Link to='/register'>Register</Link></p>
    </div>
  );
};

export default Login;
