import React from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Header.module.scss';

const Component = ({ className }) => (
  <div className={clsx(className, styles.root)}>

    <div className={styles.container}>
      <h2>to-do-app</h2>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

export {
  Component as Header,
  Component as HeaderComponent,
};
