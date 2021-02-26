import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({ className }) => (
  <div className={clsx(className, styles.root)}>

    <div className={styles.container}>
      <h2>TO DO APP</h2>
      <button>Logout</button>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

// const mapStateToProps = (state) => ({
//   user: state.user,
// });


// const Container = connect(mapStateToProps)(Component);

export {
  Component as Header,
  Component as HeaderComponent,
};
