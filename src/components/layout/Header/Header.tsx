import React from 'react';

import PropTypes from 'prop-types';

import styles from './Header.module.scss';

const Component:React.FC = () => (
  <div className={styles.root}>

    <div className={styles.container}>
      <h2>to-do-app</h2>
    </div>
  </div>
);

Component.propTypes = {
  user: PropTypes.object,
};

export {
  Component as Header,
  Component as HeaderComponent,
};
