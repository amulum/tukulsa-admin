import React from "react";
import { InputBase, makeStyles, fade } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    fontFamily: "Cabin"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    fontFamily: "Cabin",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
        fontFamily: "Cabin"
      }
    }
  }
}));

/** 
 * Return Component searchBar that can filter list
 * 
 * @param {handleSearchbar} props function that will set state specific keyword search in page on change event 
 * 
*/
export default function SearchBar(props) {
  const classes = useStyles();
  const handleSearch = props.handleSearchbar;
  const handleChange = async event => {
    await handleSearch(event.target.value);
  };
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon color="secondary" />
      </div>
      <InputBase
        placeholder="ORDER ID"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={event => handleChange(event)}
      />
    </div>
  );
}
