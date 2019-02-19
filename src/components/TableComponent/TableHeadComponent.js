import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
// import st from './TableHeadComponent.scss';

const rows = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)'
  }, {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories'
  }, {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)'
  }, {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)'
  }, {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)'
  }
];

class TableHeadComponent extends Component {
  createSortHandler = property => event => {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick, order, orderBy, numSelected, rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick} />
          </TableCell>
          {rows.map(row => (
            <TableCell
              key={row.id}
              numeric={row.numeric}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === row.id ? order : false}>
              <Tooltip
                title="Sort"
                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}>
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={this.createSortHandler(row.id)}>
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

TableHeadComponent.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default TableHeadComponent;
