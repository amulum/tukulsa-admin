import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { store, actions } from "../store/store"
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function FilterBy(props) {
  const classes = useStyles();
  const [status, setStatus] = useState('');
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const filterStatus = props.handleFilterStatus
  const handleChange = async (event) => {
    await setStatus(event.target.value);
    console.log('status di handlechange',event.target.value)
    await filterStatus(event.target.value)
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Status Laporan
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={status}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>SEMUA</em>
          </MenuItem>
          <MenuItem value={"SELESAI"}>SELESAI</MenuItem>
          <MenuItem value={"BELUM DISELESAIKAN"}>BELUM DISELESAIKAN</MenuItem>
        </Select>
      </FormControl>
  )
}

export default connect("reportStatus", actions) (withRouter(FilterBy))