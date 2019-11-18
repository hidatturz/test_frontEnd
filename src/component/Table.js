import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import SelectEdit from './Select';
const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing(1)
  }
}));
export default function CustomPaginationActionsTable(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const dataTable = props.data
  const remove = props.onDelete
  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : props.data
            ).map((row,index) => (
              <TableRow key={index}>
               
                <TableCell component="th" scope="row">
                {props.edit ? <SelectEdit  data={props.dataSelect} onChange={props.onChange} classes={classes}/> : 
                <CardMedia
                    style={{
                    width: '100px', 
                    height: '40px',
                    border: '1px',
                    borderRadius: '4px',
                    padding: '5px',
                  }}
                    image={row.picture.medium}
                  />
                } 
                </TableCell>
                <TableCell align="right">{row.name.first}</TableCell>
                <TableCell align="right">
                <Button variant="contained" color="primary" onClick={()=> { props.onUpdate(row,index)}} className={classes.button}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={()=> {remove(row,index)}} className={classes.button}>
                  Delete
                </Button>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
         
        </Table>
      </div>
    </Paper>
  );
}
