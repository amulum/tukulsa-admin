import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { actions } from "../store/store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  cabin: {
    fontFamily: "Cabin"
  }
}));

/** 
 * Return Component FilterBy that can filter list
 * 
 * @props function handleFilterStatus, set state specific keyword in page
 * @props listFilter, list object that would be filtered
*/
function FilterBy(props) {
  const classes = useStyles();
  const [status, setStatus] = useState("");
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const filterStatus = props.handleFilterStatus;
  const handleChange = async event => {
    await setStatus(event.target.value);
    await filterStatus(event.target.value);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id={`${props.id}`} className={classes.cabin}>
        {props.title}
      </InputLabel>
      <Select
        labelId={`${props.id}`}
        id={`${props.id}`}
        value={status}
        onChange={handleChange}
        labelWidth={labelWidth}
        className={classes.cabin}
      >
        <MenuItem value="" className={classes.cabin}>
          <em>SEMUA</em>
        </MenuItem>
        {props.listFilter.map((item, key) => {
          return (
            <MenuItem value={item} className={classes.cabin}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default connect("reportStatus", actions)(withRouter(FilterBy));
