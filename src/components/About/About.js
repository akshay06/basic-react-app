
import React, { PureComponent } from 'react';
import styles from './About.scss';

export default class About extends PureComponent {
  render() {
    return (
      <div className={styles.heading}>About Component</div>
    );
  }
}

About.propTypes = {};

About.defaultProps = {};
