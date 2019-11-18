import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import SelecComponent from './component/Select';
import TableData from './component/Table';
import DialogPopup from './component/Dialog';
import update from 'immutability-helper';
import axios from 'axios'
//set style theme
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  styleSelect: {
    padding: theme.spacing(2),
    width: '100%',
    marginTop: '20px'
  },
  cover: {
    width: 300,
  },
}));
//end style theme
export default function AutoGrid() {
  const classes = useStyles();
  const [dataSelect, setDataSelect] = useState([]);
  const [selectValue, setSelectValue] = useState( [] )
  const [loadTable, setLoad] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [removeTrue, setRemove] = React.useState(false);
  const [isSearchable, setSearch] = React.useState(true)

  useEffect(() => {
    // Update the document title using the browser API
     const fetchData = async () => {
      const result = await axios(
        'https://randomuser.me/api/?results=50',
      );
      setDataSelect(result.data.results);
      
    };
    fetchData();
    setSearch(true)
  }, []);
  useEffect(function updateTitle() {
    setRemove(true)
  }, []);
  const handleChange = (event) => {
    setLoad(true)
    const newData = selectValue.slice()
    newData.unshift(event)
    setSelectValue(newData)
  }
  const removeData = (value,index) => {
    setOpen(true)
    if (removeTrue == true) {
      const temp = [...selectValue];
      temp.splice(selectValue.findIndex(item => item.name.first === value.name.first), 1)
      setSelectValue(temp)
    }
  }
  const update = () => {
    setEdit(true)
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditChange= (item,i) => {
    setLoad(true)
    const temp = [...selectValue];
    temp.splice(i, 1)
    setSelectValue(temp)
    const newData = []
    newData.push(item)
    setSelectValue(newData)
    setEdit(false) 
  }
  return (
    <div className={classes.root}>
      {/* component container */}
    <Container fixed>
      {/* layouting grid  */}
      <Grid container spacing={3}>
        <Grid item xs>
          {/* Component SelectComponent */}
            <SelecComponent classes={classes} isSearchable={isSearchable} data={dataSelect} onChange={handleChange}/>
          {/* end component SelectComponent */}
          {/* Component Table */}
           {loadTable ?
            (<TableData 
              edit={edit} 
              dataSelect={dataSelect} 
              // handleSimpan={handleEditSimpan} 
              onChange={handleEditChange}  
              data={selectValue}
               onUpdate={update} 
               onDelete={removeData}/> ) :
            ('')
           }
          {/* End Component Table */}
        </Grid>
      </Grid>
      <DialogPopup handleClose={handleClose} open={open} remove={removeData}/>
    </Container>
    {/* end component container */}
    </div>
  );
}