
import React, { PureComponent } from 'react';
import styles from './Home.scss';

export default class Home extends PureComponent {
  render() {
    return (
      <>
        <div className={styles.heading}>Home Component</div>
        <div className={styles.body}>Home Body</div>
      </>
    );
  }
}

Home.propTypes = {};

Home.defaultProps = {};
