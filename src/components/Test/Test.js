
import React, { PureComponent } from 'react';
import styles from './Test.scss';
import TableComponent from '../TableComponent/TableComponent';

export default class Test extends PureComponent {
  render() {
    return (
      <>
        <div className={styles.heading}>Test Component</div>
        <TableComponent />
      </>
    );
  }
}

Test.propTypes = {};

Test.defaultProps = {};
